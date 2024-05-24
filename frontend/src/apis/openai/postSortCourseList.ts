import axios from 'axios'
import { CourseListType } from 'types/plogging'
import { OPEN_AI_API_KEY } from '../common'

type Props = {
  courseList?: CourseListType
  text: string
}

export const postSortCourseList = async ({ courseList, text }: Props) => {
  const apiKey = OPEN_AI_API_KEY

  const newCourseList = courseList?.map((courseItem) => ({
    id: courseItem.id,
    name: courseItem.name,
    coordinateList: {
      start: courseItem.coordinateList[0],
      end: courseItem.coordinateList[courseItem.coordinateList.length - 1],
    },
  }))

  const promptEngineering = `${JSON.stringify(
    newCourseList
  )} 다음의 코스가 있다고 할 때, 아래의 키워드에 가장 어울리는 순서로 id만 정렬해줘. [number, number, number] 형식만 넘겨줘`

  try {
    const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // GPT-3.5-turbo 모델 지정
        messages: [{ role: 'user', content: `${promptEngineering}\n${text}` }],
        max_tokens: 4096,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )

    return result.data.choices[0].message.content
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
  }
}
