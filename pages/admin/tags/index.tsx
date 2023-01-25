import {
  AddCircleFilled,
  MinusCircleFilled,
  NextDouble,
} from '@navikt/ds-icons'
import {
  Alert,
  Button,
  Checkbox,
  Heading,
  Modal,
  Panel,
  Select,
  Table,
  TextField,
} from '@navikt/ds-react'
import Head from 'next/head'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { LoaderIcon } from '../../../components/lib/icons/loaderIcon'
import InnerContainer from '../../../components/lib/innerContainer'
import LoaderSpinner from '../../../components/lib/spinner'
import TagPill from '../../../components/lib/tagPill'
import {
  useKeywordsQuery,
  useUpdateKeywordsMutation,
  useUserInfoDetailsQuery,
} from '../../../lib/schema/graphql'

const TagsCleaner = () => {
  const kw = useKeywordsQuery()
  const [tagsInUse, setTagsInUse] = useState([] as string[])
  const [tagsObsolete, setTagsObsolete] = useState([] as string[])
  const [checkStatement1, setCheckStatement1] = useState(false)
  const [checkStatement2, setCheckStatement2] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [updateFailedMessage, setUpdateFailedMessage] = useState('')
  const [confirmChange, setConfirmChange] = useState(false)
  const [tagUpdateList, setTagUpdateList] = useState([] as string[][])
  const [updateKeywords] = useUpdateKeywordsMutation()
  const user = useUserInfoDetailsQuery()
  if(user.loading){
    return <InnerContainer><LoaderSpinner></LoaderSpinner></InnerContainer>
  }

  if(!user.data){
    return <InnerContainer>Failed to fetch user information</InnerContainer>
  }

  const notMemberOfNada = !user.data.userInfo.groups.find(g=> g.name==="nada")
  if(notMemberOfNada){
    return <InnerContainer>Permission denied</InnerContainer>
  }
  
  if (!tagsInUse.length && !tagsObsolete.length && !kw.loading && !!kw.data) {
    setTagsInUse(kw.data.keywords.map((it) => it.keyword))
  }

  const ToggleTag = (tag: string) => {
    if (!!tagsInUse.find((it) => it === tag)) {
      setTagsInUse(tagsInUse.filter((it) => it !== tag))
      setTagsObsolete([...tagsObsolete, tag])
    } else if (!!tagsObsolete.find((it) => it === tag)) {
      setTagsInUse([...tagsInUse, tag])
      setTagsObsolete(tagsObsolete.filter((it) => it !== tag))
    }
  }

  const OnCancel = () => {
    setConfirmChange(false)
    setUpdateFailedMessage('')
  }

  const OnOk = () => {
    setUpdating(true)
    updateKeywords({
      refetchQueries: ['keywords'],
      variables: {
        input: {
          obsoleteKeywords: tagsObsolete,
          replacedKeywords: tagUpdateList.map((it) => it[0]),
          newText: tagUpdateList.map((it) => it[1]),
        },
      },
    })
      .then(res => {
        if(!!res.errors){
          setUpdateFailedMessage(res.errors[0].message)
        }else{
          setConfirmChange(false)
          router.reload()
        }
      })
      .catch((e) => {
        console.log(e)
        setUpdateFailedMessage('Internal error')
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  if (tagUpdateList.find((it) => !tagsInUse.find((tag) => tag === it[0]))) {
    setTagUpdateList(
      tagUpdateList.filter((it) => !!tagsInUse.find((tag) => tag === it[0]))
    )
  }

  return (
    <InnerContainer>
      <Modal className="w-[800px]" open={confirmChange} onClose={OnCancel}>
        <Modal.Content className="flex flex-col gap-4">
          <div>
            <Heading className="mb-3" level="2" size="medium">
              Confirm Changes on Tags
            </Heading>
            {!!tagsObsolete.length && (
              <div>
                <p>
                  The {tagsObsolete.length} tag(s) below will be removed from
                  database permanently, i.e. they will be detached from all the
                  dataproducts and stories:
                </p>
                <div className="flex flex-row flex-wrap gap-2 justify-center w-4/5 mt-2">
                  {tagsObsolete.map((it, index) => (
                    <div key={index}>
                      [{it}]{index !== tagsObsolete.length - 1 && ', '}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!!tagUpdateList.length && (
              <div>
                <p>
                  The {tagUpdateList.length} tag(s) below will be replaced with
                  new text:
                </p>
                <div className="flex flex-row flex-wrap gap-2 justify-center w-4/5 mt-2">
                  {tagUpdateList.map((it, index) => (
                    <div key={index} className='flex flex-row items-center'>
                      [{it[0]}] {<NextDouble />} [{it[1]}]
                      {index !== tagUpdateList.length - 1 && ', '}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="h-6">
              {updating && (
                <div>
                  <LoaderIcon />
                  Updating...
                </div>
              )}
              {!!updateFailedMessage && (
                <div className="text-red-600">Failed to update keywords: {updateFailedMessage}</div>
              )}
            </div>
            <div className="flex flex-row gap-2 mt-10">
              <Button className="w-28" variant="secondary" onClick={OnCancel}>
                Cancel
              </Button>
              <Button className="w-28" onClick={OnOk} disabled={updating}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>

      <Head>
        <title>Admin Tools - Tags Cleaner</title>
      </Head>
      <Heading className="mt-8" spacing level="1" size="medium">
        Tags Cleanup
      </Heading>
      {kw.loading && <LoaderSpinner></LoaderSpinner>}
      {!kw.loading && !!kw.data && (
        <div>
          <Alert variant="info">
            Click tags below to move them between left and right panel.
          </Alert>
          <div className="flex flex-row">
            <Panel border className="w-72 m-6">
              <Heading spacing level="2" size="small">
                To Keep
              </Heading>
              <div className="flex flex-col flex-wrap gap-1">
                {tagsInUse.map((it, index) => (
                  <TagPill
                    key={index}
                    onClick={() => ToggleTag(it)}
                    keyword={it}
                  >
                    {it}
                  </TagPill>
                ))}
              </div>
            </Panel>
            <Panel border className="w-72 m-6 bg-gray-300">
              <Heading spacing level="2" size="small">
                TO REMOVE
              </Heading>
              <div className="flex flex-col flex-wrap gap-1 w-64">
                {tagsObsolete.map((it, index) => (
                  <TagPill
                    key={index}
                    onClick={() => ToggleTag(it)}
                    keyword={it}
                  >
                    {it}
                  </TagPill>
                ))}
              </div>
            </Panel>
          </div>
          {!!tagsObsolete.length && (
            <div>
              <p className="mb-2">
                You must check all the control questions below before you can
                submit:
              </p>
              <div>
                <Checkbox
                  value={checkStatement1}
                  onChange={(e) => {
                    setCheckStatement1(!checkStatement1)
                  }}
                >
                  I understand that all the tags in the right panel (TO REMOVE)
                  will be removed from database permanently, and the operation
                  is not reversible.
                </Checkbox>
              </div>
              <div className="mb-2">
                <Checkbox
                  value={checkStatement2}
                  onChange={(e) => {
                    setCheckStatement2(!checkStatement2)
                  }}
                >
                  I have done backup for database.
                </Checkbox>
              </div>
            </div>
          )}
          <Heading className="mt-8" spacing level="1" size="medium">
            Tags Replacement
          </Heading>
          <Table className="w-[50rem] mb-10" size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="w-[2rem]"></Table.HeaderCell>
                <Table.HeaderCell className="w-[20rem]">Tags</Table.HeaderCell>
                <Table.HeaderCell className="w-[2rem]"></Table.HeaderCell>
                <Table.HeaderCell className="w-[20rem]">
                  Replace with
                </Table.HeaderCell>
                <Table.HeaderCell className="w-[5rem]"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tagUpdateList.map((it, index) => (
                <Table.Row key={index}>
                  <Table.DataCell>
                    <button
                      onClick={() =>
                        setTagUpdateList(
                          tagUpdateList.filter((ttu) => ttu[0] !== it[0])
                        )
                      }
                    >
                      <MinusCircleFilled color="#C30000" />
                    </button>
                  </Table.DataCell>
                  <Table.DataCell>
                    <Select
                      className="w-full"
                      label=""
                      value={it}
                      size="small"
                      onChange={(e) => {
                        tagUpdateList[index][0] = e.target.value
                        console.log(tagUpdateList)
                        setTagUpdateList([...tagUpdateList])
                      }}
                    >
                      <option value={it[0]} key={65535}>
                        {it[0]}
                      </option>
                      {[
                        ...new Set(
                          tagsInUse
                            .filter(
                              (tag) =>
                                !tagUpdateList.find((ttu) => tag === ttu[0])
                            )
                            .map((tag, index) => (
                              <option value={tag} key={index}>
                                {tag}
                              </option>
                            ))
                        ),
                      ]}
                    </Select>
                  </Table.DataCell>
                  <Table.DataCell>
                    <NextDouble />
                  </Table.DataCell>
                  <Table.DataCell>
                    <TextField
                      label={''}
                      placeholder="Type new tag text..."
                      size="small"
                      onChange={(e) =>
                        setTagUpdateList([
                          ...tagUpdateList.map((ttu) =>
                            it[0] !== ttu[0] ? ttu : [ttu[0], e.target.value]
                          ),
                        ])
                      }
                    ></TextField>
                  </Table.DataCell>
                  <Table.DataCell>
                    {!it[1] && <div className="text-red-600">Empty</div>}
                  </Table.DataCell>
                </Table.Row>
              ))}
              {tagUpdateList.length < tagsInUse.length && (
                <Table.Row key={65535}>
                  <Table.DataCell>
                    <button
                      onClick={() => {
                        const availableTag = tagsInUse.find(
                          (it) => !tagUpdateList.find((ttu) => it === ttu[0])
                        )
                        if (!!availableTag) {
                          setTagUpdateList([
                            ...tagUpdateList,
                            [availableTag, ''],
                          ])
                        }
                      }}
                    >
                      <AddCircleFilled color="#007C2E" />
                    </button>
                  </Table.DataCell>
                  <Table.DataCell></Table.DataCell>
                  <Table.DataCell></Table.DataCell>
                  <Table.DataCell></Table.DataCell>
                  <Table.DataCell></Table.DataCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Button
            disabled={
              ((!checkStatement1 || !checkStatement2) &&
                !!tagsObsolete.length) ||
              !!tagUpdateList.find((it) => !it[1]) ||
              (!tagsObsolete.length && !tagUpdateList.length)
            }
            onClick={() => setConfirmChange(true)}
          >
            Submit
          </Button>
        </div>
      )}
    </InnerContainer>
  )
}

export default TagsCleaner
