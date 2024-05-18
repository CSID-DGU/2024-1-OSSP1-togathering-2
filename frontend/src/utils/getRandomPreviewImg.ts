import cardPreview001Img from 'assets/images/card_preview_001.png'
import cardPreview002Img from 'assets/images/card_preview_002.png'
import cardPreview003Img from 'assets/images/card_preview_003.png'
import cardPreview004Img from 'assets/images/card_preview_004.png'
import cardPreview005Img from 'assets/images/card_preview_005.png'
import cardPreview006Img from 'assets/images/card_preview_006.png'
import cardPreview007Img from 'assets/images/card_preview_007.png'
import cardPreview008Img from 'assets/images/card_preview_008.png'
import cardPreview009Img from 'assets/images/card_preview_009.png'
import cardPreview010Img from 'assets/images/card_preview_010.png'

export const getRandomPreviewImg = () => {
  let imgList = [
    cardPreview001Img,
    cardPreview002Img,
    cardPreview003Img,
    cardPreview004Img,
    cardPreview005Img,
    cardPreview006Img,
    cardPreview007Img,
    cardPreview008Img,
    cardPreview009Img,
    cardPreview010Img,
  ]

  let randomIndex = Math.floor(Math.random() * 10)

  return imgList[randomIndex]
}
