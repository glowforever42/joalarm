import React, { useState, useEffect, useCallback, useContext } from 'react';
import Button from '../components/Atoms/Button';
import styled from "styled-components";
import Modal from "../components/Atoms/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { updateEmojiAPI, readEmojiAPI, SlidesProps } from '../api/emojiAPI';
import { AuthContext } from '../store/authContext';


const Emoji = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState<string>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [state, setState] = useState<number>(0);
  const [slides, setSlides] = useState<SlidesProps[]>([]);
  const [token, setToken] = useState<string>('');
  const { onChangeEmoji } = useContext(AuthContext);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  useEffect(() => {
    callReadEmojiAPI()
    setToken(localStorage.getItem('token') || '')
  }, []);
  const callReadEmojiAPI = () => {
    readEmojiAPI({ emojiUrl: 'string' })
      .then((res:any) => {
        // console.log(res)
        setSlides(res)
      })
      .catch((err:any) => {
        console.log(err);
      });
  };
  const callUpdateEmojiAPI = () => {
    const UpdateEmojiInfo = {
      emojiUrl: slides[state],
    }
    updateEmojiAPI(UpdateEmojiInfo, token)
      .then(() => {
        onChangeEmoji(UpdateEmojiInfo.emojiUrl.toString())
        console.log('교체 성공')
      })
      .catch((err:any) => {
        console.log(err);
      });
  }
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 5,
    arrows: false,
    speed: 500,
    focusOnSelect: true,
    beforeChange: (current:any, next:any) =>
      setState(next),
  };

  return (
    <div>
      {/* 헤더컴포넌트 이모지 버튼 */}
      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton> 
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <CarouselDiv>
            <Carousel {...settings}>
            {slides.map((slide:any) => (
              <div key={slide} className="slide">
                <Img src={slide} alt="" />
              </div>
            ))}
            </Carousel>
          </CarouselDiv>
          <Button
            width='160px'
            height='40px'
            fontSize='12px'
            Radius='20px'
            margin='20px 0px 32px 0px'
            onClick={callUpdateEmojiAPI}>선택 완료</Button>
          <TextTag>
            나를 표현할 이모지를{"\n"}
            골라보세요
          </TextTag>
        </Modal>
      )}
      
    </div>
    
  )
}
const DialogButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: blueviolet;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
const CarouselDiv = styled.div`
  width:300px;
  height:100px;
`
const Carousel = styled(Slider)`
  .slick-list {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .slick-track {
    display: flex;
    align-items: center
    height: 100px;
  }
  .slick-current {
    opacity: 1;
    transform: scale(1.6)
  }
`;

const TextTag = styled.p`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px
`


const Img = styled.img`
  width: 50px;
  height: 50px;
`
export default Emoji;