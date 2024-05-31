import { th } from "date-fns/locale"
import { createStoryUrl, deleteTemplate, postTemplate, putTemplate, updateStoryUrl } from "./restApi"
import { isThenable } from "next/dist/client/components/router-reducer/router-reducer-types"

export const createStory = (newStory: any, files: any[]) => {
    console.log(newStory, files)
    const formData = new FormData()
    files.forEach((file, idx) => {
        console.log(file, idx)
        formData.append(`files[${idx}][path]`, file.path)
        formData.append(`files[${idx}][file]`, file.file)
    })
    formData.append('story', JSON.stringify(newStory))
    console.log(formData)
    console.log(formData.get('files[0][file]'))
    return fetch(createStoryUrl(), {
        method: 'POST',
        credentials: 'include',
        body: formData,
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })    
}

export const updateStory =(storyId: string, updatedStory: any) => {
    return putTemplate(updateStoryUrl(storyId), updatedStory).then((res) => res.json())
}

export const deleteStory = (storyId: string) => {
    return deleteTemplate(updateStoryUrl(storyId), {isDeleted: true}).then((res) => res.json())
}