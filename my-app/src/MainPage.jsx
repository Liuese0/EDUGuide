import React, { useState } from 'react';

import "./index.css";



const EducationalGuidanceTool = () => {
  // 상태 관리
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  
  // 학생 특성 분석을 위한 질문들

  let scores = {
    math: { score: 0 },
    physics: { score: 0 },
    chemistry: { score: 0 },
    engineering: { score: 0 },
    medicine: { score: 0 },
    fineArts: { score: 0 },
    design: { score: 0 },
    music: { score: 0 },
    theater: { score: 0 },
    koreanLiterature: { score: 0 },
    nursing: { score: 0 },
    agriculture: { score: 0 },
    business: { score: 0 },
    education: { score: 0 },
    psychology: { score: 0 },
    sociology: { score: 0 },
    physical: { score: 0 },
    civil: { score: 0 },
    biology: { score: 0 },
    pharmacy: { score: 0 },
    law: { score: 0 },
    politics: { score: 0 },
    computerScience: { score: 0 },
    history: { score: 0 },
    philosophy: { score: 0 },
    journalism: { score: 0 }
  };
  

  const questions = [
    {
      id: 'schoolType',
      question: '현재 재학 중인 고등학교 유형은 무엇인가요?',
      options: [
        { value: 'general', text: '일반고등학교' },
        { value: 'autonomous', text: '자율형 사립고/자율형 공립고' },
        { value: 'science', text: '과학고등학교' },
        { value: 'foreign', text: '외국어고/국제고' },
        { value: 'art', text: '예술고등학교' },
        { value: 'physical', text: '체육고등학교' },
        { value: 'meister', text: '마이스터고/특성화고' }
      ],
      weight: 2, // 진로 추천에 중요한 항목에 가중치 부여
      category: 'basic'
    },
    {
      id: 'gradeLevel',
      question: '현재 학년은 어떻게 되나요?',
      options: [
        { value: 'first', text: '1학년' },
        { value: 'second', text: '2학년' },
        { value: 'third', text: '3학년' }
      ],
      weight: 1,
      category: 'basic'
    },
    {
      id: 'academicRanking',
      question: '전체 교과 등급은 평균적으로 어떻게 되나요?',
      options: [
        { value: 'rank1', text: '1등급 (상위 4% 이내)' },
        { value: 'rank2', text: '2등급 (상위 4~11%)' },
        { value: 'rank3', text: '3등급 (상위 11~23%)' },
        { value: 'rank4', text: '4등급 (상위 23~40%)' },
        { value: 'rank5', text: '5등급 (상위 40~60%)' },
        { value: 'rank6', text: '6등급 (상위 60~77%)' },
        { value: 'rank7', text: '7등급 이하 (상위 77% 이상)' }
      ],
      weight: 3,
      category: 'academic'
    },
    {
      id: 'subjectRanking',
      question: '주요 과목별 등급은 어떻게 되나요?',
      options: [
        { value: 'koreanHigh', text: '국어: 1~2등급' },
        { value: 'koreanMid', text: '국어: 3~4등급' },
        { value: 'koreanLow', text: '국어: 5등급 이하' },
        { value: 'mathHigh', text: '수학: 1~2등급' },
        { value: 'mathMid', text: '수학: 3~4등급' },
        { value: 'mathLow', text: '수학: 5등급 이하' },
        { value: 'englishHigh', text: '영어: 1~2등급' },
        { value: 'englishMid', text: '영어: 3~4등급' },
        { value: 'englishLow', text: '영어: 5등급 이하' },
        { value: 'scienceHigh', text: '과학: 1~2등급' },
        { value: 'scienceMid', text: '과학: 3~4등급' },
        { value: 'scienceLow', text: '과학: 5등급 이하' },
        { value: 'socialHigh', text: '사회: 1~2등급' },
        { value: 'socialMid', text: '사회: 3~4등급' },
        { value: 'socialLow', text: '사회: 5등급 이하' }
      ],
      multiSelect: true,
      maxSelect: 5,
      weight: 4,
      category: 'academic'
    },
    {
      id: 'interestArea',
      question: '가장 관심 있는 학문 분야는 무엇인가요?',
      options: [
        { value: 'humanities', text: '인문학(문학, 역사, 철학 등)' },
        { value: 'socialSciences', text: '사회과학(정치, 경제, 사회, 심리학 등)' },
        { value: 'naturalSciences', text: '자연과학(물리, 화학, 생물 등)' },
        { value: 'engineering', text: '공학(컴퓨터, 기계, 전자 등)' },
        { value: 'medical', text: '의학/약학/보건 분야' },
        { value: 'education', text: '교육학 분야' },
        { value: 'business', text: '경영/경제 분야' },
        { value: 'arts', text: '예술(음악, 미술, 디자인 등)' },
        { value: 'physical', text: '체육(스포츠과학, 건강 등)' }
      ],
      weight: 5, // 가장 중요한 요소 중 하나
      category: 'interest'
    },
    {
      id: 'secondaryInterest',
      question: '두 번째로 관심 있는 학문 분야가 있다면 무엇인가요?',
      options: [
        { value: 'none', text: '특별히 없음' },
        { value: 'humanities', text: '인문학(문학, 역사, 철학 등)' },
        { value: 'socialSciences', text: '사회과학(정치, 경제, 사회, 심리학 등)' },
        { value: 'naturalSciences', text: '자연과학(물리, 화학, 생물 등)' },
        { value: 'engineering', text: '공학(컴퓨터, 기계, 전자 등)' },
        { value: 'medical', text: '의학/약학/보건 분야' },
        { value: 'education', text: '교육학 분야' },
        { value: 'business', text: '경영/경제 분야' },
        { value: 'arts', text: '예술(음악, 미술, 디자인 등)' },
        { value: 'physical', text: '체육(스포츠과학, 건강 등)' }
      ],
      weight: 3,
      category: 'interest'
    },
    {
      id: 'careerValues',
      question: '진로 선택에서 가장 중요하게 생각하는 가치는 무엇인가요? (최대 2개)',
      options: [
        { value: 'stability', text: '직업 안정성' },
        { value: 'income', text: '높은 수입' },
        { value: 'workLifeBalance', text: '일과 삶의 균형' },
        { value: 'socialContribution', text: '사회 기여도' },
        { value: 'selfGrowth', text: '자기 성장' },
        { value: 'challenge', text: '도전과 혁신' },
        { value: 'autonomy', text: '자율성과 독립성' },
        { value: 'recognition', text: '인정과 명예' }
      ],
      multiSelect: true,
      maxSelect: 2,
      weight: 4,
      category: 'interest'
    },
    {
      id: 'selectedSubjects',
      question: '현재 수강중이거나 수강 예정인 선택과목은 무엇인가요? (여러 개 선택 가능)',
      options: [
        { value: 'literature', text: '문학/독서/화법과 작문' },
        { value: 'math1', text: '수학I' },
        { value: 'math2', text: '수학II' },
        { value: 'calculus', text: '미적분' },
        { value: 'statistics', text: '확률과 통계' },
        { value: 'geometry', text: '기하' },
        { value: 'physics1', text: '물리학I' },
        { value: 'physics2', text: '물리학II' },
        { value: 'chemistry1', text: '화학I' },
        { value: 'chemistry2', text: '화학II' },
        { value: 'biology1', text: '생명과학I' },
        { value: 'biology2', text: '생명과학II' },
        { value: 'earthScience1', text: '지구과학I' },
        { value: 'earthScience2', text: '지구과학II' },
        { value: 'koreanHistory', text: '한국사' },
        { value: 'worldHistory', text: '세계사' },
        { value: 'ethics', text: '윤리와 사상/생활과 윤리' },
        { value: 'politics', text: '정치와 법' },
        { value: 'economics', text: '경제' },
        { value: 'society', text: '사회·문화' },
        { value: 'programming', text: '프로그래밍/정보' },
        { value: 'secondLanguage', text: '제2외국어' },
        { value: 'arts', text: '음악/미술 관련 과목' },
        { value: 'physical', text: '체육 관련 과목' }
      ],
      multiSelect: true,
      maxSelect: 8,
      weight: 4,
      category: 'academic'
    },
    {
      id: 'favoriteSubjects',
      question: '가장 흥미롭게 공부하는 과목은 무엇인가요? (최대 3개)',
      options: [
        { value: 'korean', text: '국어' },
        { value: 'math', text: '수학' },
        { value: 'english', text: '영어' },
        { value: 'physics', text: '물리' },
        { value: 'chemistry', text: '화학' },
        { value: 'biology', text: '생명과학' },
        { value: 'earthScience', text: '지구과학' },
        { value: 'history', text: '역사' },
        { value: 'ethics', text: '윤리' },
        { value: 'politics', text: '정치와 법' },
        { value: 'economics', text: '경제' },
        { value: 'society', text: '사회·문화' },
        { value: 'programming', text: '프로그래밍/정보' },
        { value: 'secondLanguage', text: '제2외국어' },
        { value: 'arts', text: '음악/미술' },
        { value: 'physical', text: '체육' }
      ],
      multiSelect: true,
      maxSelect: 3,
      weight: 4,
      category: 'interest'
    },
    {
      id: 'clubs',
      question: '참여하고 있는 동아리 활동은 무엇인가요? (최대 3개)',
      options: [
        { value: 'mathClub', text: '수학 관련 동아리' },
        { value: 'scienceClub', text: '과학 실험/연구 동아리' },
        { value: 'readingClub', text: '독서/토론 동아리' },
        { value: 'languageClub', text: '외국어 관련 동아리' },
        { value: 'programmingClub', text: '코딩/프로그래밍 동아리' },
        { value: 'roboticsClub', text: '로봇/기계공학 동아리' },
        { value: 'debateClub', text: '토론/시사 동아리' },
        { value: 'newspaperClub', text: '교지/신문 동아리' },
        { value: 'volunteerClub', text: '봉사 동아리' },
        { value: 'environmentClub', text: '환경 동아리' },
        { value: 'musicClub', text: '음악 동아리' },
        { value: 'artClub', text: '미술/디자인 동아리' },
        { value: 'sportsClub', text: '체육 동아리' },
        { value: 'broadcastClub', text: '방송/영상 동아리' },
        { value: 'businessClub', text: '경영/경제 동아리' },
        { value: 'otherClub', text: '기타 동아리' },
        { value: 'noClub', text: '동아리 활동을 하지 않음' }
      ],
      multiSelect: true,
      maxSelect: 3,
      weight: 3,
      category: 'activity'
    },
    {
      id: 'classActivities',
      question: '학급/학교 활동에서의 역할은 무엇인가요?',
      options: [
        { value: 'classPresident', text: '학급 회장/부회장' },
        { value: 'studentCouncil', text: '학생회 임원' },
        { value: 'clubLeader', text: '동아리 부장/차장' },
        { value: 'subjectRepresentative', text: '교과 도우미/학습 멘토' },
        { value: 'eventOrganizer', text: '행사 기획/운영 담당' },
        { value: 'regularMember', text: '일반 구성원' }
      ],
      weight: 2,
      category: 'activity'
    },
    {
      id: 'leadershipStyle',
      question: '리더십이나 팀워크에서 본인의 성향은 어떤가요?',
      options: [
        { value: 'leader', text: '주도적으로 이끄는 것을 선호함' },
        { value: 'supporter', text: '조력자 역할을 선호함' },
        { value: 'specialist', text: '특정 분야의 전문가 역할을 선호함' },
        { value: 'mediator', text: '조정과 중재 역할을 선호함' },
        { value: 'independent', text: '독립적으로 일하는 것을 선호함' }
      ],
      weight: 2,
      category: 'personality'
    },
    {
      id: 'awards',
      question: '교내/외 수상 경력이 있나요?',
      options: [
        { value: 'academicAwards', text: '교과 관련 우수상/장려상 (다수)' },
        { value: 'academicAwardsFew', text: '교과 관련 우수상/장려상 (소수)' },
        { value: 'competitionAwards', text: '교내 경시대회 수상 (다수)' },
        { value: 'competitionAwardsFew', text: '교내 경시대회 수상 (소수)' },
        { value: 'externalAwards', text: '교외 대회/경진대회 수상' },
        { value: 'leadershipAwards', text: '리더십/봉사 관련 수상' },
        { value: 'noAwards', text: '특별한 수상 경력 없음' }
      ],
      multiSelect: true,
      maxSelect: 3,
      weight: 3,
      category: 'activity'
    },
    {
      id: 'awardDetails',
      question: '가장 의미 있게 생각하는 수상 경력이 있다면 간략히 서술해주세요.',
      type: 'text',
      placeholder: '대회명, 수상 내역, 활동 내용 등을 간략히 작성해주세요.',
      maxLength: 300,
      weight: 2,
      category: 'activity',
      conditional: {
        dependsOn: 'awards',
        showIf: ['academicAwards', 'academicAwardsFew', 'competitionAwards', 'competitionAwardsFew', 'externalAwards', 'leadershipAwards']
      }
    },
    {
      id: 'specialActivities',
      question: '특별한 교과 외 활동이나 경험이 있나요? (최대 3개)',
      options: [
        { value: 'researchProject', text: '교내 연구/탐구 프로젝트' },
        { value: 'volunteerRegular', text: '정기적인 봉사활동 (50시간 이상)' },
        { value: 'volunteerFew', text: '간헐적인 봉사활동 (50시간 미만)' },
        { value: 'internship', text: '직업 체험/인턴십 경험' },
        { value: 'competition', text: '대회/경진대회 참가' },
        { value: 'campActivities', text: '캠프/워크숍 참가' },
        { value: 'certificates', text: '자격증 취득' },
        { value: 'publications', text: '발표/출판 경험' },
        { value: 'overseas', text: '해외 교류/어학연수' },
        { value: 'sports', text: '체육 특기 활동' },
        { value: 'arts', text: '예술 특기 활동' },
        { value: 'noSpecial', text: '특별한 활동 없음' }
      ],
      multiSelect: true,
      maxSelect: 3,
      weight: 3,
      category: 'activity'
    },
    {
      id: 'specialActivityDetails',
      question: '가장 의미 있게 생각하는 교과 외 활동에 대해 간략히 서술해주세요.',
      type: 'text',
      placeholder: '활동명, 참여 기간, 역할, 배운 점 등을 간략히 작성해주세요.',
      maxLength: 300,
      weight: 2,
      category: 'activity',
      conditional: {
        dependsOn: 'specialActivities',
        showIf: ['researchProject', 'volunteerRegular', 'volunteerFew', 'internship', 'competition', 'campActivities', 'certificates', 'publications', 'overseas', 'sports', 'arts']
      }
    },
    {
      id: 'certificates',
      question: '취득한 자격증이 있다면 무엇인가요? (최대 3개)',
      options: [
        { value: 'language', text: '외국어 관련 자격증 (TOEIC, TOEFL, JLPT 등)' },
        { value: 'computer', text: '컴퓨터/IT 관련 자격증' },
        { value: 'design', text: '디자인/예술 관련 자격증' },
        { value: 'finance', text: '금융/경제 관련 자격증' },
        { value: 'sports', text: '체육/스포츠 관련 자격증' },
        { value: 'technical', text: '기술/기능 관련 자격증' },
        { value: 'teaching', text: '교육 관련 자격증' },
        { value: 'other', text: '기타 자격증' },
        { value: 'none', text: '취득한 자격증 없음' }
      ],
      multiSelect: true,
      maxSelect: 3,
      weight: 2,
      category: 'activity'
    },
    {
      id: 'attendanceRecord',
      question: '출결 상황은 어떻게 되나요?',
      options: [
        { value: 'perfect', text: '무단결석/지각 전혀 없음' },
        { value: 'good', text: '무단결석 없음, 지각 3회 이내' },
        { value: 'average', text: '무단결석 1~2회 또는 지각 다수' },
        { value: 'poor', text: '무단결석 3회 이상' }
      ],
      weight: 1,
      category: 'basic'
    },
    {
      id: 'standardizedTests',
      question: '모의고사 성적은 어느 정도인가요? (최근 기준)',
      options: [
        { value: 'top1', text: '상위 1% 이내' },
        { value: 'top4', text: '상위 4% 이내' },
        { value: 'top11', text: '상위 11% 이내' },
        { value: 'top23', text: '상위 23% 이내' },
        { value: 'top40', text: '상위 40% 이내' },
        { value: 'top60', text: '상위 60% 이내' },
        { value: 'below60', text: '상위 60% 이상' }
      ],
      weight: 3,
      category: 'academic'
    },
    {
      id: 'subjectScores',
      question: '모의고사에서 가장 높은 점수를 받는 영역은 무엇인가요? (최대 2개)',
      options: [
        { value: 'korean', text: '국어' },
        { value: 'math', text: '수학' },
        { value: 'english', text: '영어' },
        { value: 'koreanHistory', text: '한국사' },
        { value: 'socialStudies', text: '사회탐구' },
        { value: 'science', text: '과학탐구' },
        { value: 'vocational', text: '직업탐구' },
        { value: 'secondLanguage', text: '제2외국어/한문' }
      ],
      multiSelect: true,
      maxSelect: 2,
      weight: 3,
      category: 'academic'
    },
    {
      id: 'studyHabits',
      question: '주로 어떤 방식으로 공부하는 것을 선호하나요?',
      options: [
        { value: 'selfStudy', text: '혼자서 자율적으로 공부' },
        { value: 'groupStudy', text: '친구들과 함께 스터디 그룹으로 공부' },
        { value: 'tutoring', text: '개인 과외나 학원 수업을 통한 공부' },
        { value: 'onlineLearning', text: '온라인 강의나 자료를 활용한 공부' },
        { value: 'practicalLearning', text: '실습이나 체험을 통한 학습' }
      ],
      weight: 2,
      category: 'personality'
    },
    {
      id: 'personalityType',
      question: '자신의 성격 유형은 어떻다고 생각하나요? (2개 선택)',
      options: [
        { value: 'analytical', text: '분석적/논리적' },
        { value: 'creative', text: '창의적/예술적' },
        { value: 'practical', text: '실용적/현실적' },
        { value: 'social', text: '사교적/대인관계 중심적' },
        { value: 'adventurous', text: '모험적/도전적' },
        { value: 'organized', text: '체계적/계획적' },
        { value: 'flexible', text: '유연한/적응력 있는' },
        { value: 'cautious', text: '신중한/완벽주의적' }
      ],
      multiSelect: true,
      maxSelect: 2,
      weight: 3,
      category: 'personality'
    },
    {
      id: 'workEnvironment',
      question: '선호하는 작업/근무 환경은 어떤 유형인가요?',
      options: [
        { value: 'outdoor', text: '야외/현장 위주' },
        { value: 'office', text: '사무실/실내 환경' },
        { value: 'laboratory', text: '연구실/실험실' },
        { value: 'creative', text: '창작 스튜디오/예술 공간' },
        { value: 'online', text: '온라인/디지털 환경' },
        { value: 'mixed', text: '다양한 환경을 오가는 형태' }
      ],
      weight: 2,
      category: 'interest'
    },
    {
      id: 'admissionPreference',
      question: '선호하는 대입 전형은 무엇인가요?',
      options: [
        { value: 'suneung', text: '정시 수능위주전형' },
        { value: 'comprehensive', text: '수시 학생부종합전형' },
        { value: 'subject', text: '수시 학생부교과전형' },
        { value: 'specialTalent', text: '수시 실기/특기자전형' },
        { value: 'social', text: '사회배려자/지역균형전형' },
        { value: 'notSure', text: '아직 잘 모르겠음' }
      ],
      weight: 2,
      category: 'academic'
    },
    {
      id: 'universityPreference',
      question: '대학 선택 시 가장 중요하게 생각하는 요소는 무엇인가요? (최대 2개)',
      options: [
        { value: 'reputation', text: '대학의 전체적인 명성/인지도' },
        { value: 'majorReputation', text: '지원 학과의 전문성/평판' },
        { value: 'location', text: '대학의 위치/지역' },
        { value: 'facilities', text: '캠퍼스 환경/시설' },
        { value: 'scholarship', text: '장학금/학비 지원' },
        { value: 'curriculum', text: '교육과정/프로그램 내용' },
        { value: 'career', text: '취업률/진로 지원' },
        { value: 'network', text: '동문 네트워크/인맥 형성' }
      ],
      multiSelect: true,
      maxSelect: 2,
      weight: 2,
      category: 'interest'
    },
    {
      id: 'majorInterest',
      question: '관심 있는 대학 전공은 무엇인가요? (최대 3개)',
      options: [
        { value: 'koreanLiterature', text: '국어국문학' },
        { value: 'foreignLanguage', text: '외국어/언어학' },
        { value: 'history', text: '역사/고고학' },
        { value: 'philosophy', text: '철학/윤리학' },
        { value: 'politics', text: '정치외교학' },
        { value: 'economics', text: '경제학' },
        { value: 'business', text: '경영학/회계학' },
        { value: 'sociology', text: '사회학/문화인류학' },
        { value: 'psychology', text: '심리학' },
        { value: 'education', text: '교육학' },
        { value: 'math', text: '수학/통계학' },
        { value: 'physics', text: '물리학' },
        { value: 'chemistry', text: '화학' },
        { value: 'biology', text: '생물학/생명과학' },
        { value: 'earthScience', text: '지구과학/천문학' },
        { value: 'computerScience', text: '컴퓨터공학/소프트웨어' },
        { value: 'electrical', text: '전기전자공학' },
        { value: 'mechanical', text: '기계공학' },
        { value: 'civil', text: '건축/토목공학' },
        { value: 'chemicalEng', text: '화학공학/신소재공학' },
        { value: 'medicine', text: '의학' },
        { value: 'dentistry', text: '치의학' },
        { value: 'pharmacy', text: '약학' },
        { value: 'nursing', text: '간호학' },
        { value: 'healthScience', text: '보건학/의료공학' },
        { value: 'agriculture', text: '농업/산림/환경학' },
        { value: 'fineTarts', text: '미술/조형예술' },
        { value: 'design', text: '디자인/응용예술' },
        { value: 'music', text: '음악/공연예술' },
        { value: 'theater', text: '연극/영화/방송' },
        { value: 'physical', text: '체육/스포츠과학' },
        { value: 'military', text: '군사학/경찰학' },
        { value: 'tourism', text: '관광/호텔/외식' },
        { value: 'undecided', text: '아직 결정하지 못함' }
      ],
      multiSelect: true,
      maxSelect: 3,
      weight: 5,
      category: 'interest'
    },
    {
      id: 'careerGoals',
      question: '장래 희망 직업이나 진로 방향이 있나요? (최대 2개)',
      options: [
        { value: 'research', text: '연구원/교수' },
        { value: 'engineering', text: '엔지니어/기술자' },
        { value: 'medical', text: '의사/약사/간호사' },
        { value: 'legal', text: '변호사/판사/검사' },
        { value: 'education', text: '교사/교육 전문가' },
        { value: 'business', text: '경영/마케팅/금융 전문가' },
        { value: 'civil', text: '공무원/행정직' },
        { value: 'media', text: '언론/방송/미디어' },
        { value: 'arts', text: '예술가/디자이너' },
        { value: 'sports', text: '스포츠/체육 분야' },
        { value: 'selfEmployed', text: '창업/자영업' },
        { value: 'undecided', text: '아직 결정하지 못함' }
      ],
      multiSelect: true,
      maxSelect: 2,
      weight: 4,
      category: 'interest'
    },
    {
      id: 'learningDifficulties',
      question: '학습에 있어 어려움을 느끼는 부분이 있나요? (최대 2개)',
      options: [
        { value: 'memorization', text: '암기력/기억력' },
        { value: 'calculation', text: '수리력/계산능력' },
        { value: 'reading', text: '독해력/이해력' },
        { value: 'writing', text: '글쓰기/표현력' },
        { value: 'concentration', text: '집중력/주의력' },
        { value: 'timeManagement', text: '시간관리/계획성' },
        { value: 'testAnxiety', text: '시험 불안/스트레스' },
        { value: 'motivation', text: '학습 동기/흥미 유지' },
        { value: 'none', text: '특별한 어려움 없음' }
      ],
      multiSelect: true,
      maxSelect: 2,
      weight: 2,
      category: 'personality'
    },
    {
      id: 'parentOccupation',
      question: '부모님의 직업 분야는 무엇인가요? (선택 항목)',
      options: [
        { value: 'education', text: '교육/학술 분야' },
        { value: 'medical', text: '의료/보건 분야' },
        { value: 'engineering', text: '공학/기술 분야' },
        { value: 'business', text: '경영/금융 분야' },
        { value: 'service', text: '서비스/판매 분야' },
        { value: 'office', text: '사무/행정 분야' },
        { value: 'government', text: '공무원/공공기관' },
        { value: 'arts', text: '예술/문화 분야' },
        { value: 'selfEmployed', text: '자영업/개인사업' },
        { value: 'notApplicable', text: '해당 없음/응답 원치 않음' }
      ],
      weight: 1,
      category: 'basic',
      optional: true
    },
    {
      id: 'familyExpectation',
      question: '진로 선택에 있어 가족의 기대가 어떤 영향을 미치나요?',
      options: [
        { value: 'highInfluence', text: '가족의 기대/희망이 큰 영향을 미침' },
        { value: 'moderateInfluence', text: '가족의 의견을 참고하지만 본인의 결정이 중요' },
        { value: 'lowInfluence', text: '주로 본인의 관심사에 따라 결정' },
        { value: 'noInfluence', text: '가족의 기대와 무관하게 결정' },
        { value: 'undiscussed', text: '아직 가족과 진로에 대해 깊게 논의하지 않음' }
      ],
      weight: 1,
      category: 'basic'
    },
    {
      id: 'collegeLocation',
      question: '대학 진학 시 선호하는 지역이 있나요?',
      options: [
        { value: 'seoul', text: '서울' },
        { value: 'metropolitan', text: '수도권(경기/인천)' },
        { value: 'daejeon', text: '대전/충청권' },
        { value: 'gwangju', text: '광주/전라권' },
        { value: 'daegu', text: '대구/경북권' },
        { value: 'busan', text: '부산/경남권' },
        { value: 'gangwon', text: '강원권' },
        { value: 'jeju', text: '제주' },
        { value: 'overseas', text: '해외' },
        { value: 'noPreference', text: '지역 무관' }
      ],
      weight: 1,
      category: 'interest'
    },
    {
      id: 'studyTime',
      question: '평일 기준 하루 평균 자기주도학습 시간은 어느 정도인가요?',
      options: [
        { value: 'less1', text: '1시간 미만' },
        { value: '1to2', text: '1~2시간' },
        { value: '2to3', text: '2~3시간' },
        { value: '3to4', text: '3~4시간' },
        { value: '4to5', text: '4~5시간' },
        { value: 'more5', text: '5시간 이상' }
      ],
      weight: 2,
      category: 'academic'
    },
    {
      id: 'futureSkills',
      question: '미래를 위해 습득하고 싶은 역량은 무엇인가요? (최대 3개)',
      options: [
        { value: 'digitalLiteracy', text: '디지털 리터러시/코딩 능력' },
        { value: 'foreignLanguage', text: '외국어 능력' },
        { value: 'communication', text: '의사소통/발표 능력' },
        { value: 'leadership', text: '리더십/조직 관리 능력' },
        { value: 'creativity', text: '창의성/문제해결 능력' },
        { value: 'criticalThinking', text: '비판적 사고/분석 능력' },
        { value: 'collaboration', text: '협업/팀워크 능력' },
        { value: 'entrepreneurship', text: '창업/기업가 정신' },
        { value: 'emotionalIntelligence', text: '감성 지능/대인관계 능력' },
        { value: 'technicalSkills', text: '전문 기술/자격증' }
      ],
      multiSelect: true,
      maxSelect: 3,
      weight: 3,
      category: 'interest'
    },
    {
      id: 'stressManagement',
      question: '학업 스트레스를 주로 어떻게 해소하나요?',
      options: [
        { value: 'exercise', text: '운동/신체활동' },
        { value: 'hobby', text: '취미활동/예술활동' },
        { value: 'rest', text: '충분한 휴식/수면' },
        { value: 'friends', text: '친구와의 대화/교류' },
        { value: 'media', text: '미디어 감상(영화, 음악 등)' },
        { value: 'games', text: '게임/오락' },
        { value: 'meditation', text: '명상/심리적 이완' },
        { value: 'noMethod', text: '특별한 스트레스 해소법 없음' }
      ],
      weight: 1,
      category: 'personality'
    }
  ];

  // 진로 추천 알고리즘
  const careerRecommendationAlgorithm = {
    // 대학 전공 추천 함수
    recommendMajors: function(answers) {
      let scores = this.initializeScores();
      
      // 각 응답에 따른 점수 계산
      scores = this.calculateScoresByInterest(answers, scores);
      scores = this.calculateScoresByAcademic(answers, scores);
      scores = this.calculateScoresByActivity(answers, scores);
      scores = this.calculateScoresByPersonality(answers, scores);
      
      // 성적과 학교 유형에 따른 현실적 적합도 조정
      scores = this.adjustScoresByAcademicRanking(answers, scores);
      
      // 최종 점수를 기준으로 정렬
      const sortedRecommendations = this.sortRecommendationsByScore(scores);
      
      // 상위 5개 추천 결과 반환
      return sortedRecommendations.slice(0, 5);
    },
    
    // 진로 적합성 점수 초기화
    initializeScores: function() {
      return {
        // 인문계열
        koreanLiterature: { score: 0, category: '인문계열', name: '국어국문학', description: '언어, 문학, 문화에 대한 탐구와 창작 능력을 기르는 학문' },
        foreignLanguage: { score: 0, category: '인문계열', name: '외국어/언어학', description: '다양한 언어와 그 구조, 문화적 배경을 연구하는 학문' },
        history: { score: 0, category: '인문계열', name: '역사/고고학', description: '인류의 과거와 문화유산을 탐구하고 분석하는 학문' },
        philosophy: { score: 0, category: '인문계열', name: '철학/윤리학', description: '인간의 사고, 존재, 가치에 대한 근본적 질문을 탐구하는 학문' },
        
        // 사회계열
        politics: { score: 0, category: '사회계열', name: '정치외교학', description: '정치 현상과 국제 관계를 분석하고 이해하는 학문' },
        economics: { score: 0, category: '사회계열', name: '경제학', description: '자원의 생산, 분배, 소비에 관한 원리와 현상을 연구하는 학문' },
        business: { score: 0, category: '사회계열', name: '경영학', description: '조직의 운영과 관리, 전략 수립 방법을 연구하는 학문' },
        sociology: { score: 0, category: '사회계열', name: '사회학', description: '사회 구조와 변동, 집단 행동을 분석하는 학문' },
        psychology: { score: 0, category: '사회계열', name: '심리학', description: '인간의 행동과 정신 과정을 과학적으로 연구하는 학문' },
        education: { score: 0, category: '사회계열', name: '교육학', description: '교육의 이론과 방법, 제도를 연구하는 학문' },
        law: { score: 0, category: '사회계열', name: '법학', description: '법률과 제도, 법적 원리를 연구하는 학문' },
        
        // 자연계열
        math: { score: 0, category: '자연계열', name: '수학/통계학', description: '수, 구조, 공간, 변화 등의 추상적 개념과 법칙을 연구하는 학문' },
        physics: { score: 0, category: '자연계열', name: '물리학', description: '물질과 에너지, 자연 법칙을 탐구하는 기초 과학' },
        chemistry: { score: 0, category: '자연계열', name: '화학', description: '물질의 구조, 성질, 변화를 연구하는 학문' },
        biology: { score: 0, category: '자연계열', name: '생물학', description: '생명체의 구조, 기능, 진화, 분포를 연구하는 학문' },
        earthScience: { score: 0, category: '자연계열', name: '지구과학', description: '지구와 우주의 구조, 역사, 현상을 연구하는 학문' },
        
        // 공학계열
        computerScience: { score: 0, category: '공학계열', name: '컴퓨터공학', description: '컴퓨터 시스템과 소프트웨어 개발 원리를 연구하는 학문' },
        electrical: { score: 0, category: '공학계열', name: '전기전자공학', description: '전기, 전자, 통신 시스템 설계와 응용을 연구하는 학문' },
        mechanical: { score: 0, category: '공학계열', name: '기계공학', description: '기계 시스템의 설계, 분석, 제조를 연구하는 학문' },
        civil: { score: 0, category: '공학계열', name: '건축/토목공학', description: '건물과 구조물의 설계, 시공, 유지를 연구하는 학문' },
        chemicalEng: { score: 0, category: '공학계열', name: '화학공학', description: '화학적 공정과 제품 개발, 설계를 연구하는 학문' },
        
        // 의학계열
        medicine: { score: 0, category: '의학계열', name: '의학', description: '질병의 진단, 치료, 예방을 연구하는 학문' },
        dentistry: { score: 0, category: '의학계열', name: '치의학', description: '구강 건강과 질환을 연구하고 치료하는 학문' },
        pharmacy: { score: 0, category: '의학계열', name: '약학', description: '약물의 개발, 제조, 사용을 연구하는 학문' },
        nursing: { score: 0, category: '의학계열', name: '간호학', description: '환자 돌봄과 건강 관리를 연구하는 학문' },
        healthScience: { score: 0, category: '의학계열', name: '보건학', description: '개인과 지역사회의 건강 증진을 연구하는 학문' },
        
        // 농림/생활계열
        agriculture: { score: 0, category: '농림/생활계열', name: '농업/산림학', description: '식물 재배, 산림 관리, 환경 보전을 연구하는 학문' },
        foodScience: { score: 0, category: '농림/생활계열', name: '식품영양학', description: '식품의 특성과 영양, 식생활을 연구하는 학문' },
        veterinary: { score: 0, category: '농림/생활계열', name: '수의학', description: '동물의 질병 예방과 치료를 연구하는 학문' },
        
        // 예체능계열
        fineArts: { score: 0, category: '예체능계열', name: '미술/조형예술', description: '시각 예술과 조형 활동을 연구하고 창작하는 학문' },
        design: { score: 0, category: '예체능계열', name: '디자인', description: '실용적이고 미적인 제품과 환경을 설계하는 학문' },
        music: { score: 0, category: '예체능계열', name: '음악', description: '음악 이론, 연주, 작곡을 연구하고 실천하는 학문' },
        theater: { score: 0, category: '예체능계열', name: '연극/영화', description: '공연 예술과 영상 미디어를 연구하고 창작하는 학문' },
        physical: { score: 0, category: '예체능계열', name: '체육/스포츠과학', description: '신체 활동과 스포츠를 과학적으로 연구하는 학문' }
      };
    },
    
    // 관심 분야에 따른 점수 계산
    calculateScoresByInterest: function(answers, scores) {
      // 주요 관심 분야에 따른 점수 부여
      if (answers.interestArea) {
        switch(answers.interestArea) {
          case 'humanities':
            scores.koreanLiterature.score += 20;
            scores.foreignLanguage.score += 20;
            scores.history.score += 20;
            scores.philosophy.score += 20;
            break;
          case 'socialSciences':
            scores.politics.score += 20;
            scores.economics.score += 20;
            scores.sociology.score += 20;
            scores.psychology.score += 20;
            scores.education.score += 15;
            scores.law.score += 15;
            break;
          case 'naturalSciences':
            scores.math.score += 20;
            scores.physics.score += 20;
            scores.chemistry.score += 20;
            scores.biology.score += 20;
            scores.earthScience.score += 20;
            break;
          case 'engineering':
            scores.computerScience.score += 20;
            scores.electrical.score += 20;
            scores.mechanical.score += 20;
            scores.civil.score += 20;
            scores.chemicalEng.score += 20;
            break;
          case 'medical':
            scores.medicine.score += 20;
            scores.dentistry.score += 20;
            scores.pharmacy.score += 20;
            scores.nursing.score += 20;
            scores.healthScience.score += 20;
            break;
          case 'education':
            scores.education.score += 25;
            scores.psychology.score += 15;
            scores.koreanLiterature.score += 10;
            scores.foreignLanguage.score += 10;
            break;
          case 'business':
            scores.business.score += 25;
            scores.economics.score += 20;
            scores.computerScience.score += 10;
            break;
          case 'arts':
            scores.fineArts.score += 20;
            scores.design.score += 20;
            scores.music.score += 20;
            scores.theater.score += 20;
            break;
          case 'physical':
            scores.physical.score += 25;
            scores.biology.score += 10;
            scores.healthScience.score += 10;
            break;
        }
      }
      
      // 부가적인 관심 분야에 따른 점수 부여
      if (answers.secondaryInterest && answers.secondaryInterest !== 'none') {
        switch(answers.secondaryInterest) {
          case 'humanities':
            scores.koreanLiterature.score += 10;
            scores.foreignLanguage.score += 10;
            scores.history.score += 10;
            scores.philosophy.score += 10;
            break;
          case 'socialSciences':
            scores.politics.score += 10;
            scores.economics.score += 10;
            scores.sociology.score += 10;
            scores.psychology.score += 10;
            break;
          // 기타 관심 분야에 대한 처리...
        }
      }
      
      // 직업 가치관에 따른 점수 조정
      if (answers.careerValues) {
        const values = Array.isArray(answers.careerValues) ? answers.careerValues : [answers.careerValues];
        
        values.forEach(value => {
          switch(value) {
            case 'stability':
              scores.civil.score += 8;
              scores.education.score += 8;
              scores.medicine.score += 5;
              scores.nursing.score += 5;
              break;
            case 'income':
              scores.medicine.score += 8;
              scores.dentistry.score += 8;
              scores.business.score += 6;
              scores.law.score += 6;
              scores.computerScience.score += 5;
              break;
            case 'socialContribution':
              scores.medicine.score += 6;
              scores.education.score += 6;
              scores.nursing.score += 6;
              scores.socialWork.score += 6;
              break;
            // 기타 가치에 따른 처리...
          }
        });
      }
      
      // 선호하는 작업 환경에 따른 점수 조정
      if (answers.workEnvironment) {
        switch(answers.workEnvironment) {
          case 'outdoor':
            scores.agriculture.score += 10;
            scores.civil.score += 8;
            scores.earthScience.score += 8;
            scores.physical.score += 8;
            break;
          case 'laboratory':
            scores.chemistry.score += 10;
            scores.biology.score += 10;
            scores.physics.score += 10;
            scores.medicine.score += 8;
            break;
          case 'creative':
            scores.fineArts.score += 10;
            scores.design.score += 10;
            scores.music.score += 10;
            scores.theater.score += 10;
            break;
          // 기타 환경에 따른 처리...
        }
      }
      
      // 관심 전공에 따른 직접적인 점수 부여
      if (answers.majorInterest) {
        const majors = Array.isArray(answers.majorInterest) ? answers.majorInterest : [answers.majorInterest];
        
        majors.forEach(major => {
          if (scores[major]) {
            scores[major].score += 30; // 직접 선택한 전공에 높은 가중치 부여
          }
        });
      }
      
      return scores;
    },
    
    // 학업 성취도에 따른 점수 계산
    calculateScoresByAcademic: function(answers, scores) {
      // 전체 교과 등급에 따른 점수 보정
      if (answers.academicRanking) {
        let academicMultiplier = 1.0;
        
        switch(answers.academicRanking) {
          case 'rank1':
            academicMultiplier = 1.2; // 상위권 학생은 모든 전공 점수를 가산
            break;
          case 'rank2':
            academicMultiplier = 1.1;
            break;
          case 'rank3':
            academicMultiplier = 1.0;
            break;
          case 'rank4':
            academicMultiplier = 0.9;
            break;
          case 'rank5':
          case 'rank6':
          case 'rank7':
            academicMultiplier = 0.8; // 하위권 학생은 점수 감산
            break;
        }
        
        // 모든 전공에 대한 학업 성취도 보정 적용
        for (const key in scores) {
          scores[key].score *= academicMultiplier;
        }
      }
      
      // 과목별 등급에 따른 특정 전공 점수 조정
      if (answers.subjectRanking) {
        const subjects = Array.isArray(answers.subjectRanking) ? answers.subjectRanking : [answers.subjectRanking];
        
        subjects.forEach(subject => {
          if (subject === 'koreanHigh') {
            scores.koreanLiterature.score += 15;
            scores.foreignLanguage.score += 8;
            scores.education.score += 8;
            scores.law.score += 8;
          } else if (subject === 'mathHigh') {
            scores.math.score += 15;
            scores.physics.score += 10;
            scores.computerScience.score += 10;
            scores.electrical.score += 10;
            scores.economics.score += 8;
          } else if (subject === 'englishHigh') {
            scores.foreignLanguage.score += 15;
            scores.business.score += 8;
            scores.theater.score += 5;
          } else if (subject === 'scienceHigh') {
            scores.physics.score += 10;
            scores.chemistry.score += 10;
            scores.biology.score += 10;
            scores.medicine.score += 8;
            scores.engineering.score += 8;
          } else if (subject === 'socialHigh') {
            scores.history.score += 10;
            scores.politics.score += 10;
            scores.economics.score += 10;
            scores.sociology.score += 10;
            scores.law.score += 8;
          }
          // 중간/하위 등급에 대한 처리도 추가할 수 있음
        });
      }
      
      // 선택 과목에 따른 점수 조정
      if (answers.selectedSubjects) {
        const subjects = Array.isArray(answers.selectedSubjects) ? answers.selectedSubjects : [answers.selectedSubjects];
        
        subjects.forEach(subject => {
          switch(subject) {
            case 'literature':
              scores.koreanLiterature.score += 8;
              scores.education.score += 5;
              break;
            case 'calculus':
              scores.math.score += 10;
              scores.physics.score += 8;
              scores.engineering.score += 8;
              break;
            case 'physics1':
            case 'physics2':
              scores.physics.score += 10;
              scores.mechanical.score += 8;
              scores.electrical.score += 8;
              break;
            case 'chemistry1':
            case 'chemistry2':
              scores.chemistry.score += 10;
              scores.chemicalEng.score += 8;
              scores.pharmacy.score += 8;
              break;
            case 'biology1':
            case 'biology2':
              scores.biology.score += 10;
              scores.medicine.score += 8;
              scores.nursing.score += 8;
              break;
            // 기타 과목에 대한 처리...
          }
        });
      }
      
      // 흥미있는 과목에 따른 추가 점수
      if (answers.favoriteSubjects) {
        const subjects = Array.isArray(answers.favoriteSubjects) ? answers.favoriteSubjects : [answers.favoriteSubjects];
        
        subjects.forEach(subject => {
          switch(subject) {
            case 'korean':
              scores.koreanLiterature.score += 12;
              scores.education.score += 6;
              break;
            case 'math':
              scores.math.score += 12;
              scores.physics.score += 6;
              scores.computerScience.score += 6;
              break;
            // 기타 흥미 과목에 대한 처리...
          }
        });
      }
      
      return scores;
    },
    
    // 활동 경험에 따른 점수 계산
    calculateScoresByActivity: function(answers, scores) {
      // 동아리 활동에 따른 점수 조정
      if (answers.clubs) {
        const clubs = Array.isArray(answers.clubs) ? answers.clubs : [answers.clubs];
        
        clubs.forEach(club => {
          switch(club) {
            case 'mathClub':
              scores.math.score += 8;
              scores.physics.score += 4;
              scores.computerScience.score += 4;
              break;
            case 'scienceClub':
              scores.physics.score += 6;
              scores.chemistry.score += 6;
              scores.biology.score += 6;
              scores.medicine.score += 4;
              break;
            case 'readingClub':
              scores.koreanLiterature.score += 8;
              scores.philosophy.score += 6;
              scores.history.score += 6;
              scores.education.score += 4;
              break;
            case 'programmingClub':
              scores.computerScience.score += 10;
              scores.electrical.score += 6;
              scores.math.score += 4;
              break;
            case 'debateClub':
              scores.politics.score += 8;
              scores.law.score += 8;
              scores.sociology.score += 6;
              break;
            case 'newspaperClub':
              scores.koreanLiterature.score += 6;
              scores.sociology.score += 6;
              scores.theater.score += 4;
              break;
            case 'environmentClub':
              scores.earthScience.score += 8;
              scores.agriculture.score += 8;
              scores.biology.score += 6;
              break;
            case 'musicClub':
              scores.music.score += 10;
              scores.fineArts.score += 4;
              break;
            case 'artClub':
              scores.fineArts.score += 10;
              scores.design.score += 8;
              break;
            case 'businessClub':
              scores.business.score += 10;
              scores.economics.score += 8;
              break;
          }
        });
      }
      
      // 특별 활동에 따른 점수 조정
      if (answers.specialActivities) {
        const activities = Array.isArray(answers.specialActivities) ? answers.specialActivities : [answers.specialActivities];
        
        activities.forEach(activity => {
          switch(activity) {
            case 'researchProject':
              scores.physics.score += 6;
              scores.chemistry.score += 6;
              scores.biology.score += 6;
              scores.computerScience.score += 6;
              break;
            case 'volunteerRegular':
              scores.nursing.score += 6;
              scores.education.score += 6;
              scores.sociology.score += 6;
              scores.psychology.score += 6;
              break;
            case 'internship':
              scores.business.score += 8;
              scores.computerScience.score += 6;
              scores.design.score += 6;
              break;
            case 'certificates':
              scores.computerScience.score += 6;
              scores.business.score += 6;
              scores.engineering.score += 4;
              break;
            case 'publications':
              scores.koreanLiterature.score += 8;
              scores.journalism.score += 8;
              scores.theater.score += 6;
              break;
            case 'overseas':
              scores.foreignLanguage.score += 10;
              scores.business.score += 6;
              scores.sociology.score += 4;
              break;
            case 'sports':
              scores.physical.score += 10;
              scores.healthScience.score += 6;
              break;
            case 'arts':
              scores.fineArts.score += 10;
              scores.design.score += 8;
              scores.music.score += 8;
              scores.theater.score += 8;
              break;
          }
        });
      }
      
      // 학급/학교 활동 역할에 따른 점수 조정
      if (answers.classActivities) {
        switch(answers.classActivities) {
          case 'classPresident':
          case 'studentCouncil':
            scores.politics.score += 8;
            scores.education.score += 6;
            scores.business.score += 6;
            scores.law.score += 4;
            break;
          case 'clubLeader':
            scores.business.score += 6;
            scores.education.score += 4;
            break;
          case 'subjectRepresentative':
            scores.education.score += 8;
            scores.psychology.score += 4;
            break;
          case 'eventOrganizer':
            scores.business.score += 8;
            scores.theater.score += 6;
            scores.design.score += 4;
            break;
        }
      }
      
      // 취득한 자격증에 따른 점수 조정
      if (answers.certificates) {
        const certs = Array.isArray(answers.certificates) ? answers.certificates : [answers.certificates];
        
        certs.forEach(cert => {
          switch(cert) {
            case 'language':
              scores.foreignLanguage.score += 10;
              scores.education.score += 4;
              break;
            case 'computer':
              scores.computerScience.score += 10;
              scores.electrical.score += 6;
              break;
            case 'design':
              scores.design.score += 10;
              scores.fineArts.score += 6;
              break;
            case 'finance':
              scores.business.score += 10;
              scores.economics.score += 8;
              break;
            case 'sports':
              scores.physical.score += 10;
              scores.healthScience.score += 6;
              break;
            case 'teaching':
              scores.education.score += 10;
              scores.psychology.score += 6;
              break;
          }
        });
      }
      
      return scores;
    },
    
    // 성격과 학습 스타일에 따른 점수 계산
    // calculateScoresByPersonality 함수 수정
    calculateScoresByPersonality: function(answers, scores) {
      // 함수의 입력값 유효성 검사
      if (!answers) {
        console.warn("answers가 정의되지 않았습니다");
        return scores;
      }
      
      // 'engineering' 속성이 없는 경우 처리
      const hasEngineeringProperty = scores.hasOwnProperty('engineering');
      if (!hasEngineeringProperty) {
        // 로그 출력
        console.warn("scores 객체에 'engineering' 속성이 없습니다. 관련 공학 전공으로 점수를 분배합니다.");
      }

      // 'journalism' 속성이 없는 경우 처리
      const hasJournalismProperty = scores.hasOwnProperty('journalism');
      if (!hasJournalismProperty) {
        console.warn("scores 객체에 'journalism' 속성이 없습니다.");
      }
      
      // personalityType 속성 확인 및 처리
      if (answers.personalityType) {
        // 배열 또는 단일 값으로 처리
        const types = Array.isArray(answers.personalityType) ? answers.personalityType : [answers.personalityType];
        
        types.forEach(type => {
          switch(type) {
            case 'analytical':
              scores.math.score += 6;
              scores.physics.score += 6;
              scores.chemistry.score += 6;
              
              // 'engineering' 속성 안전 확인
              if (hasEngineeringProperty) {
                scores.engineering.score += 4;
              } else {
                // 대체: 관련 공학 전공에 점수 분배
                scores.electrical.score += 2;
                scores.mechanical.score += 2;
              }
              scores.medicine.score += 4;
              break;
            case 'creative':
              scores.fineArts.score += 8;
              scores.design.score += 8;
              scores.music.score += 8;
              scores.theater.score += 8;
              scores.koreanLiterature.score += 6;
              break;
            case 'practical':
              // 'engineering' 속성 안전 확인
              if (hasEngineeringProperty) {
                scores.engineering.score += 6;
              } else {
                // 대체: 관련 공학 전공에 점수 분배
                scores.electrical.score += 3;
                scores.mechanical.score += 3;
              }
              scores.nursing.score += 6;
              scores.agriculture.score += 6;
              scores.business.score += 4;
              break;
            case 'social':
              scores.education.score += 8;
              scores.psychology.score += 8;
              scores.sociology.score += 6;
              scores.nursing.score += 6;
              scores.business.score += 4;
              break;
            case 'adventurous':
              scores.physical.score += 6;
              scores.theater.score += 6;
              scores.civil.score += 4;
              scores.biology.score += 4;
              break;
            case 'organized':
              scores.business.score += 6;
              // 'engineering' 속성 안전 확인
              if (hasEngineeringProperty) {
                scores.engineering.score += 6;
              } else {
                // 대체: 관련 공학 전공에 점수 분배
                scores.electrical.score += 3;
                scores.mechanical.score += 3;
              }
              scores.medicine.score += 4;
              scores.pharmacy.score += 4;
              scores.law.score += 4;
              break;
            default:
              // 기본 케이스 추가: 알려지지 않은 성격 유형
              console.warn("알 수 없는 성격 유형:", type);
              // 기본적으로 여러 분야에 골고루 낮은 점수 부여
              scores.business.score += 2;
              scores.education.score += 2;
              break;
          }
        });
      }
      
      // 학습 스타일에 따른 점수 조정
      if (answers.studyHabits) {
        switch(answers.studyHabits) {
          case 'selfStudy':
            scores.math.score += 4;
            scores.koreanLiterature.score += 4;
            scores.computerScience.score += 4;
            break;
          case 'groupStudy':
            scores.education.score += 4;
            scores.business.score += 4;
            scores.sociology.score += 4;
            break;
          case 'practicalLearning':
            scores.fineArts.score += 6;
            // 'engineering' 속성 안전 확인
            if (hasEngineeringProperty) {
              scores.engineering.score += 6;
            } else {
              // 대체: 관련 공학 전공에 점수 분배
              scores.electrical.score += 3;
              scores.mechanical.score += 3;
            }
            scores.physical.score += 6;
            scores.medicine.score += 4;
            break;
          default:
            // 기본 케이스 추가
            console.warn("알 수 없는 학습 스타일:", answers.studyHabits);
            break;
        }
      }
      
      // 리더십 스타일에 따른 점수 조정
      if (answers.leadershipStyle) {
        switch(answers.leadershipStyle) {
          case 'leader':
            scores.business.score += 6;
            scores.politics.score += 6;
            scores.education.score += 4;
            break;
          case 'supporter':
            scores.nursing.score += 6;
            scores.education.score += 6;
            scores.psychology.score += 4;
            break;
          case 'specialist':
            scores.medicine.score += 6;
            // 'engineering' 속성 안전 확인
            if (hasEngineeringProperty) {
              scores.engineering.score += 6;
            } else {
              // 대체: 관련 공학 전공에 점수 분배
              scores.electrical.score += 3;
              scores.mechanical.score += 3;
            }
            scores.computerScience.score += 6;
            break;
          case 'mediator':
            scores.psychology.score += 6;
            scores.sociology.score += 6;
            scores.law.score += 4;
            break;
          case 'independent':
            scores.computerScience.score += 4;
            scores.fineArts.score += 4;
            scores.koreanLiterature.score += 4;
            scores.math.score += 4;
            break;
          default:
            // 기본 케이스 추가
            console.warn("알 수 없는 리더십 스타일:", answers.leadershipStyle);
            break;
        }
      }
      
      // 학습 어려움에 따른 점수 조정
      if (answers.learningDifficulties) {
        const difficulties = Array.isArray(answers.learningDifficulties) ? answers.learningDifficulties : [answers.learningDifficulties];
        
        difficulties.forEach(difficulty => {
          switch(difficulty) {
            case 'memorization':
              scores.medicine.score -= 4;
              scores.law.score -= 4;
              scores.biology.score -= 2;
              scores.chemistry.score -= 2;
              break;
            case 'calculation':
              scores.math.score -= 4;
              scores.physics.score -= 4;
              // 'engineering' 속성 안전 확인
              if (hasEngineeringProperty) {
                scores.engineering.score -= 2;
              } else {
                // 대체: 관련 공학 전공에 점수 감소
                scores.electrical.score -= 1;
                scores.mechanical.score -= 1;
              }
              scores.chemistry.score -= 2;
              break;
            case 'reading':
              scores.koreanLiterature.score -= 4;
              scores.law.score -= 4;
              scores.history.score -= 2;
              scores.philosophy.score -= 2;
              break;
            case 'writing':
              scores.koreanLiterature.score -= 4;
              // 'journalism' 속성 안전 확인
              if (hasJournalismProperty) {
                scores.journalism.score -= 4;
              }
              scores.law.score -= 2;
              scores.education.score -= 2;
              break;
            default:
              // 기본 케이스 추가
              console.warn("알 수 없는 학습 어려움:", difficulty);
              break;
          }
        });
      }
      
      return scores;
    },
    
    // 학업 성취도에 따른 현실적 적합도 조정
    adjustScoresByAcademicRanking: function(answers, scores) {
      // 일부 전공은 높은 학업 성취도가 필요
      const highCompetitiveMajors = ['medicine', 'dentistry', 'pharmacy', 'law', 'veterinary'];
      const moderateCompetitiveMajors = ['computerScience', 'electrical', 'mechanical', 'nursing', 'business'];
      
      // 학업 성취도가 낮은 경우 경쟁률 높은 전공 점수 감소
      if (answers.academicRanking === 'rank5' || answers.academicRanking === 'rank6' || answers.academicRanking === 'rank7') {
        for (const major of highCompetitiveMajors) {
          if (scores[major]) {
            scores[major].score -= 20; // 경쟁률 높은 전공 점수 크게 감소
          }
        }
        
        for (const major of moderateCompetitiveMajors) {
          if (scores[major]) {
            scores[major].score -= 10; // 중간 경쟁률 전공 점수 소폭 감소
          }
        }
      }
      
      // 학교 유형에 따른 추가 조정
      if (answers.schoolType) {
        switch(answers.schoolType) {
          case 'science':
            // 과학고는 자연/공학 계열 점수 증가
            scores.physics.score += 10;
            scores.chemistry.score += 10;
            scores.biology.score += 10;
            scores.math.score += 10;
            scores.computerScience.score += 8;
            scores.electrical.score += 8;
            scores.mechanical.score += 8;
            break;
          case 'foreign':
            // 외고/국제고는 어학/국제 관련 전공 점수 증가
            scores.foreignLanguage.score += 12;
            scores.business.score += 8;
            scores.politics.score += 8;
            scores.koreanLiterature.score += 6;
            break;
          case 'art':
            // 예술고는 예술 계열 점수 증가
            scores.fineArts.score += 15;
            scores.design.score += 15;
            scores.music.score += 15;
            scores.theater.score += 15;
            break;
          case 'physical':
            // 체육고는 체육 계열 점수 증가
            scores.physical.score += 20;
            scores.healthScience.score += 10;
            break;
          case 'meister':
            // 마이스터고/특성화고는 실무 관련 전공 점수 증가
            scores.mechanical.score += 10;
            scores.electrical.score += 10;
            scores.computerScience.score += 10;
            scores.business.score += 8;
            scores.design.score += 8;
            break;
        }
      }
      
      return scores;
    },
    
    // 점수를 기준으로 정렬하여 추천 결과 반환
    sortRecommendationsByScore: function(scores) {
      // 점수를 기준으로 정렬 가능한 배열로 변환
      const scoreArray = Object.keys(scores).map(key => {
        return {
          id: key,
          name: scores[key].name,
          category: scores[key].category,
          description: scores[key].description,
          score: scores[key].score
        };
      });
      
      // 점수 기준 내림차순 정렬
      scoreArray.sort((a, b) => b.score - a.score);
      
      return scoreArray;
    },
    
    // 대학 추천 기능
    recommendUniversities: function(answers, majorRecommendations) {
      // 추천 전공에 따른 대학 추천 로직 구현
      let universityRecommendations = [];
      
      // 상위 추천 전공에 적합한 대학 목록
      const topMajor = majorRecommendations[0];
      
      // 학생의 학업 성취도
      const academicTier = this.getAcademicTier(answers);
      
      // 선호 지역 고려
      const preferredLocation = answers.collegeLocation || 'noPreference';
      
      // 전공 카테고리별 대학 추천
      switch(topMajor.category) {
        case '인문계열':
          universityRecommendations = this.getHumanitiesUniversities(academicTier, preferredLocation);
          break;
        case '사회계열':
          universityRecommendations = this.getSocialSciencesUniversities(academicTier, preferredLocation);
          break;
        case '자연계열':
          universityRecommendations = this.getNaturalSciencesUniversities(academicTier, preferredLocation);
          break;
        case '공학계열':
          universityRecommendations = this.getEngineeringUniversities(academicTier, preferredLocation);
          break;
        case '의학계열':
          universityRecommendations = this.getMedicalUniversities(academicTier, preferredLocation);
          break;
        case '예체능계열':
          universityRecommendations = this.getArtsUniversities(academicTier, preferredLocation);
          break;
        default:
          universityRecommendations = this.getGeneralUniversities(academicTier, preferredLocation);
      }
      
      return universityRecommendations;
    },
    
    // 학업 성취도 티어 결정
    getAcademicTier: function(answers) {
      // 학생의 전체 교과 등급에 따른 티어 결정
      if (answers.academicRanking === 'rank1') {
        return 'top';
      } else if (answers.academicRanking === 'rank2' || answers.academicRanking === 'rank3') {
        return 'high';
      } else if (answers.academicRanking === 'rank4' || answers.academicRanking === 'rank5') {
        return 'mid';
      } else {
        return 'low';
      }
    },
    
    // 인문계열 대학 추천
    getHumanitiesUniversities: function(academicTier, location) {
      // 학업 성취도와 지역에 따른 대학 추천 목록
      const universities = {
        top: ['서울대학교 인문대학', '연세대학교 문과대학', '고려대학교 문과대학', '서강대학교 인문대학', '성균관대학교 문과대학','이화여자대학교 인문과학대학', '한양대학교 인문과학대학', '중앙대학교 인문대학','건국대학교 문과대학','동국대학교 문과대학', "한국외대 문과대학", '홍익대학교 문과대학', '경희대학교 문과대학', '서울시립대학교 인문대학'],
        high: ['숙명여자대학교 문과대학', '국민대학교 문과대학' ,'상명대학교 인문사회과학대학','가톨릭대학교 인문학부','세종대학교 인문과학대학'],
        mid: ['서울여자대학교 인문대학', "한성대학교 문과대학"],
        low: ['서울한영대학교 인문대학','성서대학교 인문대학']
      };
      
      // 지역 필터링 적용 (서울 외 지역 대학 추가 필요)
      if (location !== 'seoul' && location !== 'noPreference') {
        // 다른 지역 대학들 추가 (필요에 따라 확장)
        if (location === 'busan') {;
          universities.high.push("부산대학교 인문대학");
          universities.low.push("동아대학교 인문대학","부경대학교 인문대학","경성대학교 인문대학", "동서대학교 인문대학", "신라대학교 인문대학","고신대학교 인문대학","국립해양대학교 인문대학");
        } else if (location === 'daejeon') {
          universities.mid.push('충남대학교 인문대학');
          universities.low.push("목원대학교 인문대학", '배제대학교 인문대학','대전대학교 인문대학', );
        } else if (location === 'metropolitan'){
            universities.mid.push('가천대학교 인문대학', '한국외국어대학교(글로벌) 인문대학','경기대학교 인문대학', '강남대학교 인문대학' ,'인천대학교 인문대학');
            universities.low.push('경동대학교 인문대학', '중부대학교 인문대학', '청운대학교 인문대학');
            universities.high.push('한양대학교(에리카) 인문대학', '단국대학교(죽전) 인문대학', '아주대학교 인문대학', '인하대학교 인문대학');
        } else if (location === 'gwangju'){
            universities.low.push('조선대학교 인문대학' );
            universities.high.push('전남대학교 인문대학');
        } else if (location === 'daegu'){
            universities.high.push('경북대학교 인문대학');
            universities.low.push('계명대학교 인문대학');

        }else if (location === 'gangwon'){
            universities.mid.push('강원대학교 인문대학');
            
        }
        // 기타 지역별 대학 추가...
      }
      
      return universities[academicTier];
    },
    
    // 다른 계열별 대학 추천 메소드들...
    getSocialSciencesUniversities: function(academicTier, location) {
      // 사회계열 대학 추천 로직
      const universities = {
        top: ['서울대학교 사회과학대학', '연세대학교 사회과학대학', '고려대학교 정경대학', '서강대학교 사회과학대학', '성균관대학교 사회과학대학','이화여자대학교 사회과학대학', '한양대학교 사회과학대학', '중앙대학교 사회과학대학', '경희대학교 정경대학','건국대학교 사회과학대학', '동국대학교 사회과학대학', '홍익대학교 경영대학', '서울시립대학교 사회과학대학'],
        high: ['숙명여자대학교 사회과학대학', '국민대학교 사회과학대학', '상명대학교 사회과학대학', '세종대학교 사회과학대학'],
        mid: ['덕성여자대학교 사회과학대학', '서울여자대학교 사회과학대학', '가톨릭대학교 사회과학부' ],
        low: ['서울한영대학교 사회대학','성서대학교 사회대학']
      };

      return universities[academicTier];
    },
    
    getNaturalSciencesUniversities: function(academicTier, location) {
      // 자연계열 대학 추천 로직
      const universities = {
        top: ['서울대학교 자연과학대학', '연세대학교 이과대학', '고려대학교 이과대학','성균관대학교 자연과학대학', '한양대학교 자연과학대학', '이화여자대학교 자연과학대학', '서강대학교 자연과학대학', '중앙대학교 자연과학대학','건국대학교 이과대학', '경희대학교 이과대학', '동국대학교 이과대학', '홍익대학교 자연과학대학'],
        high: [ '국민대학교 자연과학대학', '세종대학교 자연과학대학', '상명대학교 자연과학대학', '광운대학교 자연과학대학'],
        mid: ['삼육대학교 자연과학대학', '서경대학교 자연과학대학', '한성대학교 자연과학대학'],
        low: []
      };
      if (location !== 'seoul' && location !== 'noPreference') {
        // 다른 지역 대학들 추가 (필요에 따라 확장)
        if (location === 'busan') {;
            universities.high.push('부산대 자연과학대학');
            universities.low.push('동아대학교 자연과학대학', '동의대학교 자연과학대학', '동명대학교 자연과학대학');
        } else if (location === 'daejeon') {
            universities.top.push('카이스트');
            universities.mid.push('건양대학교 자연과학대학', '충남대학교 자연과학대학');
            universities.low.push('목원대학교 자연과학대학', '한남대학교 자연과학대학', '한밭대학교 자연과학대학');
        } else if (location === 'metropolitan'){
            universities.mid.push('가천대학교 자연과학대학', '한국외국어대학교(글로벌) 자연과학대학','경기대학교 자연과학대학', '강남대학교 자연과학대학' ,'인천대학교 자연과학대학');
            universities.low.push('경동대학교 자연과학대학', '중부대학교 자연과학대학', '청운대학교 자연과학대학');
            universities.high.push('한양대학교(에리카) 자연과학대학', '단국대학교(죽전) 자연과학대학', '아주대학교 자연과학대학', '인하대학교 자연과학대학');
        } else if (location === 'gwangju'){
            universities.top.push('광주과학기술원');
            universities.low.push('조선대학교 자연과학대학' );
            universities.high.push('전남대학교 자연과학대학');
        } else if (location === 'daegu'){
            universities.top.push('대국경북과학기술원');
            universities.high.push('경북대학교 자연과학대학');
            universities.low.push('계명대학교 자연과학대학');

        }else if (location === 'gangwon'){
            universities.mid.push('강원대학교 자연과학대학');
            universities.low.push('한림대학교 자연과학대학, 한남대 자연과학대학');
        }
        // 기타 지역별 대학 추가...
      }
      return universities[academicTier];
    },
    
    getEngineeringUniversities: function(academicTier, location) {
      // 공학계열 대학 추천 로직
      const universities = {
        top: ['서울대학교 공과대학', '연세대학교 공과대학', '고려대학교 공과대학','성균관대학교 공과대학', '한양대학교 공과대학', '중앙대학교 공과대학', '경희대학교 공과대학', '서울시립대학교 공과대학','건국대학교 공과대학'],
        high: [ '홍익대학교 공과대학','국민대학교 공과대학', '세종대학교 공과대학','명지대학교 공과대학'],
        mid: ['덕성여자대학교 공과대학', '서울여자대학교 공과대학', '가톨릭대학교 공과대학'],
        low: [ '서울한영대학교 공과대학','성서대학교 공과대학']
      };
      if (location !== 'seoul' && location !== 'noPreference') {
        // 다른 지역 대학들 추가 (필요에 따라 확장)
        if (location === 'busan') {;
            universities.high.push('부산대 공과대학');
            universities.low.push('동아대학교 공과대학', '동의대학교 공과대학', '동명대학교 공과대학');
        } else if (location === 'daejeon') {
            universities.top.push('카이스트');
            universities.mid.push('건양대학교 공과대학', '충남대학교 공과대학');
            universities.low.push('목원대학교 공과대학', '한남대학교 공과대학', '한밭대학교 공과대학');
        } else if (location === 'metropolitan'){
            universities.mid.push('가천대학교 공과대학', '한국외국어대학교(글로벌) 공과대학','경기대학교 공과대학', '강남대학교 공과대학' ,'인천대학교 공과대학');
            universities.low.push('경동대학교 공과대학', '중부대학교 공과대학', '청운대학교 공과대학');
            universities.high.push('한양대학교(에리카) 공과대학', '단국대학교(죽전) 공과대학', '아주대학교 공과대학', '인하대학교 공과대학');
        } else if (location === 'gwangju'){
            universities.top.push('광주과학기술원');
            universities.low.push('조선대학교 공과대학' );
            universities.high.push('전남대학교 공과대학');
        } else if (location === 'daegu'){
            universities.top.push('대국경북과학기술원');
            universities.high.push('경북대학교 공과대학');
            universities.low.push('계명대학교 공과대학');

        }else if (location === 'gangwon'){
            universities.mid.push('강원대학교 공과대학');
            universities.low.push('한림대학교 공과대학, 한남대 공과대학');
        }
        // 기타 지역별 대학 추가...
      }
      return universities[academicTier];
    },
    
    getMedicalUniversities: function(academicTier, location) {
      // 의학계열 대학 추천 로직
      const universities = {
        top: ['서울대학교 의과대학', '연세대학교 의과대학', '고려대학교 의과대학', '성균관대학교 의과대학', '울산대학교 의과대학','이화여자대학교 의과대학', '한양대학교 의과대학', '중앙대학교 의과대학', '경희대학교 의과대학', '가톨릭대학교 의과대학','인하대학교 의과대학', '아주대학교 의과대학', '건국대학교 의과대학', '동국대학교 의과대학', '순천향대학교 의과대학','을지대학교 의과대학', '가천대학교 의과대학', '차의과학대학교', '연세대학교 원주의과대학', '건양대학교 의과대학'],
        high: [],
        mid: [],
        low: []
      };
      
      return universities[academicTier];
    },
    
    getArtsUniversities: function(academicTier, location) {
      // 예체능계열 대학 추천 로직
      const universities = {
        top: ['서울대학교 미술대학/음악대학', '한국예술종합학교', '이화여자대학교 음악대학/조형예술대학', '홍익대학교 미술대학', '국민대학교 예술대학','서울예술대학교','중앙대학교 예술대학', '경희대학교 예술·디자인대학', '한양대학교 음악대학', '성균관대학교 예술대학'],
        high: ['동덕여자대학교 예술대학', '상명대학교 예술대학', '세종대학교 예체능대학', '숙명여자대학교 음악대학', '단국대학교 예술대학' ],
        mid: ['한서대학교 예술학부', '대구예술대학교', '청주대학교 예술대학', '계원예술대학교', '백석대학교 예술대학'],
        low: ['신한대학교', '한신대학교', '협성대학교', '루터대학교', '칼빈대학교', '동양미래대학교', '남서울대학교','한남대학교','계명대학교', '조선대학교', '한국교통대학교','금오공대학교', '목포대학교' ]
      };
      
      return universities[academicTier];
    },
    
    getGeneralUniversities: function(academicTier, location) {
      // 일반적인 대학 추천 로직
      const universities = {
        top: ['서울대학교', '연세대학교', '고려대학교', '서강대학교', '성균관대학교','한양대학교', '이화여자대학교', '중앙대학교', '경희대학교', '건국대학교', '동국대학교', '홍익대학교','서울시립대학교'],
        high: [ '아주대학교', '인하대학교','국민대학교', '세종대학교', '단국대학교', '명지대학교', '숭실대학교', '부산대학교', '경북대학교','서울과학기술대학교','한국항공대학교','전남대학교'],
        mid: ['한국공학대학교','충북대학교', '인천대학교', '가톨릭대학교','경기대학교','상명대학교'],
        low: []
      };
      
      return universities[academicTier];
    },
    
    // 진로 로드맵 생성
    generateCareerRoadmap: function(answers, majorRecommendations) {
      // 추천 전공에 따른 진로 로드맵 생성
      const topMajor = majorRecommendations[0];
      const gradeLevel = answers.gradeLevel;
      
      let roadmap = {
        currentYear: {
          title: '현재 학년',
          tasks: []
        },
        nextYear: {
          title: '다음 학년',
          tasks: []
        },
        graduation: {
          title: '졸업 전',
          tasks: []
        },
        university: {
          title: '대학 진학 후',
          tasks: []
        },
        career: {
          title: '진로 계획',
          tasks: []
        }
      };
      
      // 현재 학년에 따른 로드맵 설정
      switch(gradeLevel) {
        case 'first':
          roadmap.currentYear.tasks = [
            '기초 학업 역량 강화하기',
            '다양한 동아리 활동 탐색하기',
            '관심 분야 관련 독서 및 자료 조사하기',
            '봉사활동 시작하기'
          ];
          roadmap.nextYear.tasks = [
            '수능/내신 대비 학습 계획 세우기',
            '관심 전공 관련 심화 과목 선택하기',
            '교내 경시대회 준비하기',
            '진로 탐색 프로그램 참여하기'
          ];
          break;
        case 'second':
          roadmap.currentYear.tasks = [
            '수능/내신 대비 학습 강화하기',
            '동아리 활동 심화하기',
            '관심 분야 관련 프로젝트 참여하기',
            '교내외 경시대회 참가하기'
          ];
          roadmap.nextYear.tasks = [
            '대입 전형 계획 세우기',
            '자기소개서 작성 준비하기',
            '모의고사 성적 향상에 집중하기',
            '관심 대학/학과 탐방하기'
          ];
          break;
        case 'third':
          roadmap.currentYear.tasks = [
            '대입 전형 지원 계획 확정하기',
            '자기소개서 작성 및 면접 준비하기',
            '수능 최종 대비 계획 수립하기',
            '지원 대학/학과 최종 결정하기'
          ];
          roadmap.nextYear.tasks = [
            '대학 입학 전 기초 학습하기',
            '전공 관련 기본 서적 읽기',
            '관련 자격증/어학 능력 향상하기',
            '대학 생활 계획 수립하기'
          ];
          break;
      }
      
      // 졸업 전 과제
      roadmap.graduation.tasks = [
        '대입 지원서 작성 및 제출',
        '수능 및 대학별 고사 준비 완료',
        '자기소개서 최종 정리',
        '면접 준비 및 실전 연습'
      ];
      
      // 대학 진학 후
      roadmap.university.tasks = [
        '전공 기초 과목 충실히 이수하기',
        '관련 학회/동아리 활동 참여하기',
        '인턴십/현장실습 경험 쌓기', 
        '전공 관련 자격증/어학 능력 획득하기'
      ];
      
      // 진로 계획 - 전공별 맞춤 진로 계획
      if (topMajor.category === '인문계열') {
        roadmap.career.tasks = [
          '출판/미디어/교육 분야 취업 준비',
          '대학원 진학 고려 (석사/박사)',
          '교직 이수 또는 임용고시 준비 가능',
          '통번역/문화콘텐츠 분야 진출 고려'
        ];
      } else if (topMajor.category === '사회계열') {
        roadmap.career.tasks = [
          '공공기관/기업체 취업 준비',
          '각종 고시/전문자격 시험 준비',
          '국제기구/NGO 진출 고려',
          '대학원 진학을 통한 전문성 강화'
        ];
      } else if (topMajor.category === '자연계열') {
        roadmap.career.tasks = [
          '연구소/기업 연구직 준비',
          '대학원 진학을 통한 연구 역량 강화',
          '과학 교육/커뮤니케이션 분야 고려',
          '첨단 기술 스타트업 진출 고려'
        ];
      } else if (topMajor.category === '공학계열') {
        roadmap.career.tasks = [
          '기업 연구개발(R&D) 부서 취업 준비',
          '소프트웨어/하드웨어 개발 역량 강화',
          '기술 창업 준비',
          '특허/기술 컨설팅 분야 고려'
        ];
      } else if (topMajor.category === '의학계열') {
        roadmap.career.tasks = [
          '의사/약사/간호사 면허 취득',
          '전문의/전문약사 과정 준비',
          '의료 연구기관 진출 고려',
          '보건의료 행정/정책 분야 고려'
        ];
      } else if (topMajor.category === '예체능계열') {
        roadmap.career.tasks = [
          '포트폴리오/작품집 구축',
          '공모전/대회 참가 경력 쌓기',
          '관련 산업 인턴십/현장 경험 쌓기',
          '교육자/강사 진로 고려'
        ];
      } else {
        roadmap.career.tasks = [
          '관심 산업 분야 취업 준비',
          '필요한 자격증/역량 개발하기',
          '인턴십/현장 경험 통한 실무 능력 강화',
          '대학원 진학 또는 해외 유학 고려'
        ];
      }
      
      return roadmap;
    } // 여기까지는 함수의 내용
  }
// 결과 화면 렌더링 함수
const renderResult = () => {
  if (!result) return null;
  
  return (
    <div className="result-container">
      <h2 className="result-title">진로 추천 결과</h2>
      
      <div className="recommendation-section">
        <h3>추천 전공</h3>
        <div className="recommendation-list">
          {result.recommendedMajors.map((major, index) => (
            <div key={index} className="recommendation-card">
              <div className="recommendation-header">
                <span className="recommendation-rank">{index + 1}</span>
                <h4>{major.name}</h4>
                <span className="recommendation-category">{major.category}</span>
              </div>
              <p>{major.description}</p>
              <div className="recommendation-score">
                적합도: <span className="score">{Math.round(major.score)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="university-section">
        <h3>추천 대학</h3>
        <ul className="university-list">
          {result.recommendedUniversities.map((univ, index) => (
            <li key={index}>{univ}</li>
          ))}
        </ul>
      </div>
      
      <div className="roadmap-section">
        <h3>진로 로드맵</h3>
        <div className="roadmap-timeline">
          {Object.keys(result.careerRoadmap).map((key) => (
            <div key={key} className="roadmap-step">
              <h4>{result.careerRoadmap[key].title}</h4>
              <ul>
                {result.careerRoadmap[key].tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 질문 단계 렌더링 함수
const renderQuestionStep = () => {
  const currentQuestion = questions[currentStep];
  if (!currentQuestion) return null;

  // 조건부 렌더링 처리 (이전 질문 응답에 따라 표시 여부 결정)
  if (currentQuestion.conditional) {
    const { dependsOn, showIf } = currentQuestion.conditional;
    const dependentAnswer = answers[dependsOn];
    
    // 배열인 경우와 단일 값인 경우 모두 처리
    const dependentValues = Array.isArray(dependentAnswer) ? dependentAnswer : [dependentAnswer];
    
    // showIf 배열의 값 중 하나라도 포함되어 있지 않으면 다음 질문으로 넘어감
    const shouldShow = dependentValues.some(value => showIf.includes(value));
    
    if (!shouldShow) {
      // 다음 질문으로 자동 이동
      setTimeout(() => handleNext(), 0);
      return null;
    }
  }

  return (
    <div className="question-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(currentStep / questions.length) * 100}%` }}
        ></div>
      </div>
      <div className="step-indicator">
        질문 {currentStep + 1} / {questions.length}
      </div>
      
      <h3 className="question-text">{currentQuestion.question}</h3>
      
      {currentQuestion.type === 'text' ? (
        <div className="text-input-container">
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            placeholder={currentQuestion.placeholder || '답변을 입력해주세요'}
            maxLength={currentQuestion.maxLength || 1000}
            rows={5}
          />
          <div className="character-count">
            {(answers[currentQuestion.id] || '').length} / {currentQuestion.maxLength || 1000}
          </div>
        </div>
      ) : (
        <div className="options-container">
          {currentQuestion.options.map((option) => (
            <div 
              key={option.value} 
              className={`option-item ${
                currentQuestion.multiSelect 
                  ? (Array.isArray(answers[currentQuestion.id]) && 
                     answers[currentQuestion.id]?.includes(option.value) ? 'selected' : '')
                  : answers[currentQuestion.id] === option.value ? 'selected' : ''
              }`}
              onClick={() => handleOptionSelect(currentQuestion, option.value)}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
      
      {currentQuestion.multiSelect && (
        <div className="selection-info">
          {currentQuestion.maxSelect ? `최대 ${currentQuestion.maxSelect}개까지 선택 가능합니다.` : '여러 개 선택 가능합니다.'}
        </div>
      )}
      
      <div className="navigation-buttons">
        <button 
          className="nav-button back"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          이전
        </button>
        
        <button 
          className="nav-button next"
          onClick={handleNext}
          disabled={!isQuestionAnswered(currentQuestion)}
        >
          {currentStep === questions.length - 1 ? '결과 확인' : '다음'}
        </button>
      </div>
    </div>
  );
};

// 시작 화면 렌더링
const renderStartScreen = () => {
  return (
    <div className="start-screen">
      <h1 className="app-title">EDU_Guide : 고등학생 진로 탐색 가이드</h1>
      <p className="app-description">
        학업 성취도, 관심 분야, 학교 활동 등을 바탕으로 
        개인화된 진로 추천과 대학 전공 가이드를 제공합니다.
      </p>
      <button className="start-button" onClick={() => setCurrentStep(0)}>
        시작하기
      </button>
    </div>
  );
};

// 로딩 화면 렌더링
const renderLoading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>진로 분석 중입니다...</p>
    </div>
  );
};

// 질문 응답 여부 확인 함수
const isQuestionAnswered = (question) => {
  // 선택 항목인 경우 건너뛰기 가능
  if (question.optional) return true;
  
  const answer = answers[question.id];
  
  // 답변이 없는 경우
  if (answer === undefined || answer === null || answer === '') return false;
  
  // 다중 선택 질문의 경우
  if (question.multiSelect) {
    return Array.isArray(answer) && answer.length > 0;
  }
  
  // 단일 선택 또는 텍스트 입력의 경우
  return true;
};

// 옵션 선택 처리 함수
const handleOptionSelect = (question, value) => {
  if (question.multiSelect) {
    const currentSelections = Array.isArray(answers[question.id]) ? [...answers[question.id]] : [];
    
    // 이미 선택된 옵션인 경우 제거
    if (currentSelections.includes(value)) {
      setAnswers({
        ...answers,
        [question.id]: currentSelections.filter(item => item !== value)
      });
    } 
    // 새로 선택하는 경우
    else {
      // 최대 선택 개수 제한 확인
      if (question.maxSelect && currentSelections.length >= question.maxSelect) {
        // 최대 개수 초과시 가장 먼저 선택한 항목 제거
        const newSelections = [...currentSelections.slice(1), value];
        setAnswers({
          ...answers,
          [question.id]: newSelections
        });
      } else {
        setAnswers({
          ...answers,
          [question.id]: [...currentSelections, value]
        });
      }
    }
  } else {
    // 단일 선택 질문
    setAnswers({
      ...answers,
      [question.id]: value
    });
  }
};

// 답변 변경 처리 함수
const handleAnswerChange = (id, value) => {
  setAnswers({
    ...answers,
    [id]: value
  });
};

// 이전 질문으로 이동
const handlePrevious = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};

// 다음 질문으로 이동 또는 결과 계산
const handleNext = () => {
  if (currentStep < questions.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    // 마지막 질문 이후 결과 계산
    calculateResults();
  }
};

// 결과 계산 처리
const calculateResults = () => {
  setLoading(true);
  
  // 계산에 약간의 딜레이를 주어 로딩 효과 보여주기
  setTimeout(() => {
    const recommendedMajors = careerRecommendationAlgorithm.recommendMajors(answers);
    const recommendedUniversities = careerRecommendationAlgorithm.recommendUniversities(answers, recommendedMajors);
    const careerRoadmap = careerRecommendationAlgorithm.generateCareerRoadmap(answers, recommendedMajors);
    
    setResult({
      recommendedMajors,
      recommendedUniversities,
      careerRoadmap
    });
    
    setLoading(false);
  }, 1500);
};

// 초기화 및 재시작 함수
const handleReset = () => {
  setCurrentStep(-1);
  setAnswers({});
  setResult(null);
};

// 컴포넌트 메인 렌더링
return (
  <div className="educational-guidance-tool">
    {currentStep === -1 && renderStartScreen()}
    {currentStep >= 0 && !loading && !result && renderQuestionStep()}
    {loading && renderLoading()}
    {result && renderResult()}
    
    {result && (
      <div className="restart-container">
        <button className="restart-button" onClick={handleReset}>
          다시 시작하기
        </button>
      </div>
    )}
  </div>
);
};
export default EducationalGuidanceTool;