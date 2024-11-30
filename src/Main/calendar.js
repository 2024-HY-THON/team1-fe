import styles from './calendar.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = ({ onClose }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyEmotions, setMonthlyEmotions] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 2));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month));
  };

  const fetchMonthlyEmotions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8080/emotions/${year}/${month}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMonthlyEmotions(response.data);
      console.log('연결성공');
    } catch (error) {
      console.error('월별 감정 데이터 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyEmotions();
  }, [year, month]);

  const getEmotionForDay = (day) => {
    const emotionData = monthlyEmotions.find((item) => item.day === day);
    return emotionData ? emotionData.emotion : null;
  };

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'good':
        return '#FFB431';
      case 'soso':
        return '#9ABB4C';
      case 'bad':
        return '#EA6363';
      default:
        return '#D9D9D9';
    }
  };

  // 해당 월의 첫 날과 마지막 날 구하기
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 첫 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayOfWeek = firstDay.getDay();

  // 이전 달의 마지막 날짜들을 위한 배열
  const prevMonthDays = [];
  if (firstDayOfWeek !== 0) {
    const prevLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(prevLastDay - i);
    }
  }

  // 현재 달의 날짜들을 위한 배열
  const currentMonthDays = Array.from(
    { length: lastDay.getDate() },
    (_, i) => i + 1
  );

  // 다음 달의 날짜들을 위한 배열
  const nextMonthDays = [];
  const remainingDays = 35 - (prevMonthDays.length + currentMonthDays.length);
  if (remainingDays > 0) {
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push(i);
    }
  }

  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.calendarHeader}>
          <div className={styles.year}>{year}</div>
          <div className={styles.monthSelector}>
            <button onClick={handlePrevMonth} className={styles.monthButton}>
              <svg width='6' height='10' viewBox='0 0 6 10' fill='none'>
                <path
                  d='M5 1L1 5L5 9'
                  stroke='#686868'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <div className={styles.monthTitle}>
              {monthNames[month - 1]} 감정일기
            </div>
            <button onClick={handleNextMonth} className={styles.monthButton}>
              <svg width='6' height='10' viewBox='0 0 6 10' fill='none'>
                <path
                  d='M1 1L5 5L1 9'
                  stroke='#686868'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.weekDays}>
          <span>일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span>토</span>
        </div>
        <div className={styles.days}>
          {prevMonthDays.map((day) => (
            <div
              key={`prev-${day}`}
              className={`${styles.day} ${styles.prevMonth}`}
            >
              <span>{day}</span>
            </div>
          ))}

          {currentMonthDays.map((day) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() + 1 &&
              year === today.getFullYear();
            const emotion = getEmotionForDay(day);

            return (
              <div
                key={day}
                className={`${styles.day} ${isToday ? styles.today : ''}`}
              >
                <span>{day}</span>
                <svg
                  className={styles.emoji}
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <circle
                    cx='12'
                    cy='12'
                    r='12'
                    fill={emotion ? getEmotionColor(emotion) : '#D9D9D9'}
                  />
                  {emotion && (
                    <>
                      <path
                        d='M7 14s2 2 5 2 5-2 5-2'
                        stroke='#FFF'
                        strokeWidth='1.5'
                        fill='none'
                      />
                      <circle cx='8' cy='9' r='1.5' fill='#FFF' />
                      <circle cx='16' cy='9' r='1.5' fill='#FFF' />
                    </>
                  )}
                </svg>
              </div>
            );
          })}

          {nextMonthDays.map((day) => (
            <div
              key={`next-${day}`}
              className={`${styles.day} ${styles.nextMonth}`}
            >
              <span>{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
