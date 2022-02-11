import {Fieldset} from '@navikt/ds-react'
import styled from "styled-components"
import {StoryQuery, usePublishStoryMutation} from "../../lib/schema/graphql"
import TopBar from '../lib/topBar'
import {Name} from '../lib/detailTypography'
import TeamSelector from '../lib/teamSelector'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {storyValidation} from '../../lib/schema/yupValidations'


const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 40px;
`

const DataproductBox = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

const DataproductBody = styled.div`
  padding: 1em 1em 2em 1em;
`

interface SaveFormProps {
	story: StoryQuery['story']
}

function SaveForm({ story }: SaveFormProps) {
	const router = useRouter()
	const { register, handleSubmit, formState } =
		useForm({
			resolver: yupResolver(storyValidation),
			defaultValues: {
				name: story.name,
				keywords: [] as string[],
			},
		})


	const [publishStory] = usePublishStoryMutation()

	const { errors } = formState
	const onSubmit = (requestData: any) => {
		publishStory({
			variables: {
				id: story.id,
				group: requestData.group,
			},
		}).then((published) => {
			if (published.errors) {
				console.log(published.errors)
			}
			if (published.data) {
				router.push(`/story/${published.data?.publishStory.id}`)
			}
		}).catch((error) => {
			console.log(error)
		})
		// updateDataproduct({
		// 	variables: { id: product.id, input: requestData },
		// 	awaitRefetchQueries: true,
		// 	refetchQueries: ['Dataproduct', 'searchContent'],
		// }).then(() => {
		// 	setBackendError(undefined)
		// 	router.push(`/dataproduct/${product.id}`)
		// })
	}

	return (
		<Container>
			<DataproductBox>
				<TopBar type={'Dataproduct'}>
					<Name>Lagre {story.name}</Name>
				</TopBar>
				<DataproductBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Fieldset legend={''}>
							<TeamSelector register={register} errors={errors} />
							<RightJustifiedSubmitButton
								onCancel={() => router.push(`/story/draft/${story.id}`)}
							/>
						</Fieldset>
					</form>
				</DataproductBody>
			</DataproductBox>
		</Container>
	)
}

export default SaveForm
