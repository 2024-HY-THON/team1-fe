import { useState } from 'react';
import axios from 'axios';
import styles from './diaryWrite.module.css';

const DiaryWrite = ({ onClose }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [diaryContent, setDiaryContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const emotions = [
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='38'
      height='38'
      viewBox='0 0 38 38'
      fill='none'
    >
      <path
        d='M38 19C38 13.9609 35.9982 9.12816 32.435 5.56497C28.8718 2.00178 24.0391 0 19 0C13.9609 0 9.12816 2.00178 5.56497 5.56497C2.00178 9.12816 0 13.9609 0 19C0 24.0391 2.00178 28.8718 5.56497 32.435C9.12816 35.9982 13.9609 38 19 38C24.0391 38 28.8718 35.9982 32.435 32.435C35.9982 28.8718 38 24.0391 38 19ZM22.5625 15.4375C22.5625 14.8076 22.8127 14.2035 23.2581 13.7581C23.7035 13.3127 24.3076 13.0625 24.9375 13.0625C25.5674 13.0625 26.1715 13.3127 26.6169 13.7581C27.0623 14.2035 27.3125 14.8076 27.3125 15.4375C27.3125 16.0674 27.0623 16.6715 26.6169 17.1169C26.1715 17.5623 25.5674 17.8125 24.9375 17.8125C24.3076 17.8125 23.7035 17.5623 23.2581 17.1169C22.8127 16.6715 22.5625 16.0674 22.5625 15.4375ZM10.6875 15.4375C10.6875 14.8076 10.9377 14.2035 11.3831 13.7581C11.8285 13.3127 12.4326 13.0625 13.0625 13.0625C13.6924 13.0625 14.2965 13.3127 14.7419 13.7581C15.1873 14.2035 15.4375 14.8076 15.4375 15.4375C15.4375 16.0674 15.1873 16.6715 14.7419 17.1169C14.2965 17.5623 13.6924 17.8125 13.0625 17.8125C12.4326 17.8125 11.8285 17.5623 11.3831 17.1169C10.9377 16.6715 10.6875 16.0674 10.6875 15.4375ZM11.6114 24.9731C12.5021 26.0747 13.6278 26.9631 14.9063 27.5734C16.1847 28.1836 17.5834 28.5002 19 28.5C20.4166 28.5002 21.8153 28.1836 23.0937 27.5734C24.3722 26.9631 25.4979 26.0747 26.3886 24.9731C26.4867 24.8518 26.6077 24.751 26.7448 24.6764C26.8818 24.6019 27.0322 24.555 27.1874 24.5386C27.3425 24.5222 27.4994 24.5365 27.649 24.5807C27.7987 24.6249 27.9381 24.6981 28.0594 24.7962C28.1808 24.8943 28.2816 25.0153 28.3561 25.1524C28.4307 25.2894 28.4775 25.4398 28.4939 25.5949C28.5104 25.7501 28.4961 25.907 28.4519 26.0566C28.4077 26.2062 28.3345 26.3457 28.2364 26.467C27.1229 27.8439 25.7156 28.9544 24.1174 29.7171C22.5193 30.4798 20.7708 30.8754 19 30.875C17.2292 30.8754 15.4807 30.4798 13.8826 29.7171C12.2844 28.9544 10.8771 27.8439 9.76363 26.467C9.66538 26.3457 9.59199 26.2062 9.54766 26.0565C9.50332 25.9068 9.4889 25.7499 9.50522 25.5946C9.52154 25.4393 9.56828 25.2888 9.64277 25.1516C9.71726 25.0144 9.81805 24.8932 9.93937 24.795C10.0607 24.6968 10.2002 24.6234 10.3499 24.579C10.4996 24.5347 10.6565 24.5203 10.8118 24.5366C10.967 24.5529 11.1176 24.5997 11.2548 24.6741C11.3919 24.7486 11.5131 24.8494 11.6114 24.9707'
        fill='#FFB431'
      />
    </svg>,
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='38'
      height='38'
      viewBox='0 0 38 38'
      fill='none'
    >
      <path
        d='M19 0C8.5063 0 0 8.5063 0 19C0 29.4937 8.5063 38 19 38C29.4937 38 38 29.4937 38 19C38 8.5063 29.4937 0 19 0ZM15.675 15.2C15.684 15.5174 15.6292 15.8334 15.5139 16.1293C15.3987 16.4252 15.2252 16.6949 15.0039 16.9226C14.7826 17.1503 14.5178 17.3313 14.2253 17.4549C13.9328 17.5785 13.6185 17.6422 13.3009 17.6422C12.9834 17.6422 12.6691 17.5785 12.3766 17.4549C12.0841 17.3313 11.8193 17.1503 11.598 16.9226C11.3767 16.6949 11.2032 16.4252 11.088 16.1293C10.9727 15.8334 10.9179 15.5174 10.9269 15.2C10.9444 14.582 11.2022 13.9952 11.6455 13.5642C12.0888 13.1333 12.6827 12.8922 13.3009 12.8922C13.9192 12.8922 14.5131 13.1333 14.9564 13.5642C15.3997 13.9952 15.6575 14.582 15.675 15.2ZM27.075 15.2C27.084 15.5174 27.0292 15.8334 26.9139 16.1293C26.7987 16.4252 26.6252 16.6949 26.4039 16.9226C26.1826 17.1503 25.9178 17.3313 25.6253 17.4549C25.3328 17.5785 25.0185 17.6422 24.7009 17.6422C24.3834 17.6422 24.0691 17.5785 23.7766 17.4549C23.4841 17.3313 23.2193 17.1503 22.998 16.9226C22.7767 16.6949 22.6032 16.4252 22.4879 16.1293C22.3727 15.8334 22.3179 15.5174 22.3269 15.2C22.3444 14.582 22.6022 13.9952 23.0455 13.5642C23.4888 13.1333 24.0827 12.8922 24.7009 12.8922C25.3192 12.8922 25.9131 13.1333 26.3564 13.5642C26.7997 13.9952 27.0575 14.582 27.075 15.2ZM10.45 26.125C10.45 25.7471 10.6001 25.3846 10.8674 25.1174C11.1346 24.8501 11.4971 24.7 11.875 24.7H26.125C26.5029 24.7 26.8654 24.8501 27.1326 25.1174C27.3999 25.3846 27.55 25.7471 27.55 26.125C27.55 26.5029 27.3999 26.8654 27.1326 27.1326C26.8654 27.3999 26.5029 27.55 26.125 27.55H11.875C11.4971 27.55 11.1346 27.3999 10.8674 27.1326C10.6001 26.8654 10.45 26.5029 10.45 26.125Z'
        fill='#9ABB4C'
      />
    </svg>,
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='38'
      height='38'
      viewBox='0 0 38 38'
      fill='none'
    >
      <path
        d='M19 0C16.5049 0 14.0342 0.49145 11.729 1.44629C9.42383 2.40113 7.32928 3.80066 5.56497 5.56497C2.00178 9.12816 0 13.9609 0 19C0 24.0391 2.00178 28.8718 5.56497 32.435C7.32928 34.1993 9.42383 35.5989 11.729 36.5537C14.0342 37.5085 16.5049 38 19 38C24.0391 38 28.8718 35.9982 32.435 32.435C35.9982 28.8718 38 24.0391 38 19C38 16.5049 37.5085 14.0342 36.5537 11.729C35.5989 9.42383 34.1993 7.32928 32.435 5.56497C30.6707 3.80066 28.5762 2.40113 26.271 1.44629C23.9658 0.49145 21.4951 0 19 0ZM9.5 14.25C9.5 12.73 10.83 11.4 12.35 11.4C13.87 11.4 15.2 12.73 15.2 14.25C15.2 15.77 13.87 17.1 12.35 17.1C10.83 17.1 9.5 15.77 9.5 14.25ZM24.5 28.5C22.263 26.937 21.875 26.239 19.5 26.239C17.125 26.239 15.237 26.937 13.5 28.5C11.763 30.063 9.5 28 11.039 26.239C12.578 24.478 15.675 22.8 19 22.8C23.6805 22.8 25.8521 25.0333 26.961 26.239C28.0699 27.4447 26.737 30.063 24.5 28.5ZM25.65 17.1C24.13 17.1 22.8 15.77 22.8 14.25C22.8 12.73 24.13 11.4 25.65 11.4C27.17 11.4 28.5 12.73 28.5 14.25C28.5 15.77 27.17 17.1 25.65 17.1Z'
        fill='#EA6363'
      />
    </svg>,
  ];

  const handleSubmit = async () => {
    if (selectedEmotion === null) {
      setAlertMessage('오늘의 감정을 선택해주세요!');
      setShowAlert(true);
      return;
    }
    if (selectedMood === null) {
      setAlertMessage('행복일기인가요? 걱정일기인가요?');
      setShowAlert(true);
      return;
    }
    if (!diaryContent.trim()) {
      setAlertMessage('일기 내용을 입력해주세요!');
      setShowAlert(true);
      return;
    }

    try {
      const emotionMap = ['good', 'soso', 'bad'];
      const diaryData = {
        emotion: emotionMap[selectedEmotion],
        type: selectedMood,
        content: diaryContent,
      };

      await axios.post('http://localhost:8080/diary/save', diaryData);
      setShowModal(true);
    } catch (error) {
      console.error('일기 저장 실패:', error);
      setAlertMessage('일기 저장에 실패했습니다. 다시 시도해주세요.');
      setShowAlert(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    onClose();
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={onClose}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='10'
            height='18'
            viewBox='0 0 10 18'
            fill='none'
          >
            <path
              d='M9 1L1 9L9 17'
              stroke='#ACCD5E'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
        <h1 className={styles.title}>하루일기</h1>
      </header>
      <div className={styles.emptyBox}></div>

      <div className={styles.content}>
        <div className={styles.date}>
          <span>2024년 11월 30일 (토요일)</span>
        </div>
        <div className={styles.question}>
          <span>○○님은 오늘 어떤 하루를 보내셨나요?</span>
        </div>
        <div className={styles.emojiContainer}>
          {emotions.map((emotion, index) => (
            <span
              key={index}
              className={`${styles.emoji} ${
                selectedEmotion === index ? styles.selected : ''
              }`}
              onClick={() => setSelectedEmotion(index)}
              role='button'
            >
              {emotion}
            </span>
          ))}
        </div>

        <div className={styles.moodSelector}>
          <label
            className={`${styles.moodOption} ${
              selectedMood === 'happy' ? styles.selected : ''
            }`}
          >
            <span>행복일기</span>
            <input
              type='checkbox'
              className={styles.checkbox}
              checked={selectedMood === 'happy'}
              onChange={() =>
                setSelectedMood(selectedMood === 'happy' ? null : 'happy')
              }
            />
            <span className={styles.checkmark}></span>
          </label>
          <label
            className={`${styles.moodOption} ${
              selectedMood === 'worry' ? styles.selected : ''
            }`}
          >
            <input
              type='checkbox'
              className={styles.checkbox}
              checked={selectedMood === 'worry'}
              onChange={() =>
                setSelectedMood(selectedMood === 'worry' ? null : 'worry')
              }
            />
            <span className={styles.checkmark}></span>
            <span>걱정일기</span>
          </label>
        </div>

        <textarea
          className={styles.diaryInput}
          placeholder={
            selectedMood === 'happy'
              ? '행복일기로 오늘 하루를 기억해보세요'
              : selectedMood === 'worry'
              ? 'ㅇㅇㅇ이 ㅇㅇ님의 걱정을 들어드릴게요'
              : '오늘 하루는 어떠셨나요?'
          }
          value={diaryContent}
          onChange={(e) => setDiaryContent(e.target.value)}
        />

        <button className={styles.submitButton} onClick={handleSubmit}>
          완료
        </button>
      </div>

      {showAlert && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalText}>{alertMessage}</p>
            <button
              className={styles.confirmButton}
              onClick={handleAlertConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>
              {selectedMood === 'happy' ? '오늘 행복일기' : '오늘 걱정일기'}
              <br />
              기록 완료!
            </h2>
            <p className={styles.modalText}>
              {selectedMood === 'happy'
                ? '내일은 어떤 특별한 일이 있을까요?'
                : '오늘 걱정 잊고 푹 주무세요~'}
            </p>
            <button className={styles.confirmButton} onClick={handleConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryWrite;
