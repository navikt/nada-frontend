import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import ErrorMessage from '../lib/error';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import TeamkatalogenSelector from '../lib/teamkatalogenSelector';
import DescriptionEditor from '../lib/DescriptionEditor';
import { Button, Heading, TextField, Select, Link, Label } from '@navikt/ds-react';
import amplitudeLog from '../../lib/amplitude';
import * as yup from 'yup';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import TagsSelector from '../lib/tagsSelector';
import { UserState } from '../../lib/context';
import { CREATE_STORY } from '../../lib/queries/story/createStory';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { FileTextFillIcon, FolderFillIcon, TrashIcon } from '@navikt/aksel-icons';
import { UploadFile } from '../../lib/schema/graphql';

const schema = yup.object().shape({
  name: yup.string().nullable().required('Skriv inn navnet på datafortellingen'),
  description: yup.string(),
  teamkatalogenURL: yup.string().required('Du må velge team i teamkatalogen'),
  keywords: yup.array(),
  group: yup.string().required('Du må skrive inn en gruppe for datafortellingen')
})

export interface NewStoryFields {
  name: string
  description: string
  teamkatalogenURL: string
  keywords: string[]
}

export const NewStoryForm = () => {
  const router = useRouter();
  const [productAreaID, setProductAreaID] = useState<string>('');
  const [teamID, setTeamID] = useState<string>('');
  const userData = useContext(UserState);
  const [inputKey, setInputKey] = useState(0);
  const [storyFiles, setStoryFiles] = useState<File[]>([]);
  const singleFileInputRef = useRef(null);
  const folderFileInputRef = useRef(null);

  const handleSingleFileClick = () => {
    /* @ts-expect-error */
    singleFileInputRef?.current?.click();
  };

  const handleFolderFileClick = () => {
    /* @ts-expect-error */
    folderFileInputRef?.current?.click();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        name: undefined,
        description: '',
        teamkatalogenURL: '',
        keywords: [] as string[],
    },
  })

  const { errors } = formState
  const keywords = watch('keywords')

  const onDeleteKeyword = (keyword: string) => {
    keywords !== undefined ? 
    setValue('keywords', keywords.filter((k: string) => k !== keyword))
    :
    setValue('keywords', [])
  }

  const onAddKeyword = (keyword: string) => {
    keywords
      ? setValue('keywords', [...keywords, keyword])
      : setValue('keywords', [keyword])
  }

  const valueOrNull = (val: string) => (val == '' ? null : val);

  const onSubmit = async (data: any) => {
    const uploadData = {
      variables: {
        files: storyFiles.map<UploadFile>(it=>({
          path: fixRelativePath(it),
          file: it,
        })),
        input: {
          name: data.name,
          description: valueOrNull(data.description),
          keywords: data.keywords,
          teamkatalogenURL: data.teamkatalogenURL,
          productAreaID: productAreaID,
          teamID: teamID,
          group: data.group,
        },
      },
      refetchQueries: ['searchContent', 'userInfoDetails'],
    };

    try {
      await createStory(uploadData);
      amplitudeLog('skjema fullført', { skjemanavn: 'ny-datafortelling' });
    } catch (e) {
      amplitudeLog('skjemainnsending feilet', {
        skjemanavn: 'ny-datafortelling',
      })
      console.log(e)
    }
  }

  const [createStory, { loading, error: backendError }] = useMutation(
    CREATE_STORY,
    {
      onCompleted: (data) => {
        router.push(`/story/${data.createStory.id}`);
      },
    },
  )

  const onCancel = () => {
    amplitudeLog(
      'Klikker på: Avbryt',
      {
        pageName: 'ny-datafortelling',
      },
      () => {
        router.back();
      },
    );
  }

  const onError = (errors: any) => {
    amplitudeLog('skjemavalidering feilet', {
      skjemanavn: 'ny-datafortelling',
      feilmeldinger: Object.keys(errors)
        .map((errorKey) => errorKey)
        .join(','),
    });
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setStoryFiles(Array.from(files));
    }
  }

  const fixRelativePath = (file: File) =>{
    var path = file.webkitRelativePath
    var pathParts = path.split('/');
    return pathParts.length <= 1? file.name:pathParts.slice(1).reduce((p, s, i)=>i===0? s: p+ "/" +s)
  }

  const generateFileTree = (files: File[]) => {
    const tree: any = {};
    files.forEach((file) => {
      var pathParts = file.webkitRelativePath.split('/');
      if (pathParts.length === 1) {
        pathParts = [file.name]
      }else{
        pathParts = pathParts.slice(1)
      }
      let currentLevel = tree;

      pathParts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = index === pathParts.length - 1 ? file : {};
        }
        currentLevel = currentLevel[part];
      });
    });
    return tree;
  };

  const gatherFilesToDelete = (folder: any): File[] => {
    let filesToDelete: File[] = [];
    Object.values(folder).forEach((content) => {
      if (content instanceof File) {
        filesToDelete.push(content);
      } else {
        filesToDelete = filesToDelete.concat(gatherFilesToDelete(content));
      }
    });
    return filesToDelete;
  };

  const handleDeleteClick = (isFile: boolean, node: any) => {
    var filesToDelete = isFile ? [node] : gatherFilesToDelete(node)
    const remained = storyFiles.filter((file) => {
      return !filesToDelete.find(it => it == file)
    })
    setStoryFiles(remained);
    setInputKey(inputKey + 1)
  };

  const renderTree = (nodes: any) => {
    return Object.keys(nodes).map((nodeName, index) => {
      const node = nodes[nodeName];
      const isFile = node instanceof File;

      return (
        <TreeItem
          key={nodeName}
          itemId={nodeName + index}
          label={
            <div className="flex flex-row items-center gap-2">
              {isFile ? (
                <FileTextFillIcon color="#4080c0" fontSize="1.5rem" />
              ) : (
                <FolderFillIcon color="#b09070" fontSize="1.5rem" />
              )}
              {nodeName}
              <TrashIcon onClick={() => handleDeleteClick(isFile, node)}></TrashIcon>
            </div>
          }
        >
          {!isFile && renderTree(node)}
        </TreeItem>
      );
    });
  };

  const gcpProjects = userData?.gcpProjects as any[] || []

  return (
    <div className="mt-8 md:w-[46rem]">
      <Heading level="1" size="large">
        Legg til datafortelling
      </Heading>
      <form
        className="pt-12 flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TextField
          className="w-full"
          label="Navn på datafortelling"
          {...register('name')}
          error={errors.name?.message?.toString()}
        />
        <DescriptionEditor
          label="Beskrivelse av hva datafortellingen kan brukes til"
          name="description"
          control={control}
        />
        <Select
          className="w-full"
          label="Velg gruppe fra GCP"
          {...register('group', {
            onChange: () => setValue('teamkatalogenURL', ''),
          })}
          error={errors.group?.message?.toString()}
        >
          <option value="">Velg gruppe</option>
          {[
            ...new Set(
              gcpProjects.map(
                ({ group }: { group: { name: string } }) => (
                  <option
                    value={
                      userData?.googleGroups.filter((g: any) => g.Name === group.name)[0]
                        .Email
                    }
                    key={group.name}
                  >
                    {group.name}
                  </option>
                )
              )
            ),
          ]}
        </Select>
        <TeamkatalogenSelector
          gcpGroups={gcpProjects.map((it: any) => it.group.email)}
          register={register}
          watch={watch}
          errors={errors}
          setProductAreaID={setProductAreaID}
          setTeamID={setTeamID}
        />
        <TagsSelector
          onAdd={onAddKeyword}
          onDelete={onDeleteKeyword}
          tags={keywords || []}
        />
        <div>
          <Label
            htmlFor={'0'}
            size={'medium'}
            className={'navds-text-field__label navds-label'}
          >
            Last opp datafortellingen din
          </Label>
          <div className='mt-5'>
            Du kan&nbsp;
            <Link href="#" onClick={handleSingleFileClick}>velge filer</Link>
            &nbsp;eller&nbsp;
            <Link href="#" onClick={handleFolderFileClick}>velge mapper</Link>
            &nbsp;til å laste opp&nbsp;
          </div>
        </div>
        {/* @ts-expect-error */}
        <input key={inputKey * 2} ref={folderFileInputRef} type="file" className="hidden" webkitdirectory="" directory="" onChange={handleFileUpload} multiple />
        <input key={inputKey * 2 + 1} ref={singleFileInputRef} type="file" className="hidden" onChange={handleFileUpload} multiple />
        {storyFiles.length > 0 && (
          <SimpleTreeView>
            {renderTree(generateFileTree(storyFiles))}
          </SimpleTreeView>
        )}
        {backendError && <ErrorMessage error={backendError} />}
        <div className="flex flex-row gap-4 mb-16">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Avbryt
          </Button>
          <Button type="submit">Lagre</Button>
        </div>
      </form>
    </div>
  );
};