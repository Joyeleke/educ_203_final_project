type ImageData = {
  url: string;
  width?: string;
  height?: string;
};

type IndividualBlogData = {
  id: number;
  title: string;
  images: ImageData[];
  content: string[];
  width?: string;
  height?: string;
};

const blog_data_one: IndividualBlogData[] = [
  {
    id: 1,
    title: "What is ELA?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/ivan-shilov-ucUB9wxkPgY-unsplash.jpg",
        width: "22rem",
        height: "30rem",
      },
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/towfiqu-barbhuiya-5u6bz2tYhX8-unsplash.jpg",
        width: "25rem",
        height: "25rem",
      },
    ],
    content: [
      "ELA is an abbreviation for English Language Arts. It refers to the study and use of the English language in academic settings. The term is used in the United States and Canada. ELA encompasses reading, writing, listening, and speaking. It is often taught as a separate subject in elementary and secondary schools. The course focuses on the mechanics of writing, such as grammar, punctuation, and spelling. It also covers reading comprehension and literary analysis. Essentially, it’s a catch-all term used in education to cover all the subjects and topics related to the written and spoken language.",
      "In school, ELA refers to the study of the English language and literature. It encompasses reading fiction and non-fiction texts, as well as writing and speaking in English. ELA is a core subject in most schools in the United States and Canada. From the day they start school until the time they earn their high school diploma, a student’s schedule nearly always includes ELA. We highly recommend all students to study ELA as it is an important foundation for success in college and in their careers.",
      "The core principles of ELA are reading, writing, speaking, communication, creativity, research and listening. These skills are essential for success in school and in life. ELA helps students develop critical thinking skills, communication skills, and creativity. It also helps students develop a love of reading and writing. ELA is an important subject because it teaches students how to communicate effectively in English. It helps them develop the skills they need to succeed in school and in life.",
    ],
  },
  {
    id: 2,
    title: "Why is English important?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/huma-h-yardim-oCPDom0y_yI-unsplash.jpg",
        width: "55rem",
        height: "35rem",
      },
    ],
    content: [
      "English is not just a language. It is an international communication tool. It is the language of science, technology, business, and diplomacy. English is the most widely spoken language in the world. It is the official language of many countries, including the United States, and it is one of the six official languages of the United Nations. So, if you’re thinking why is English Language Arts important, there are many more reasons like these.",
      "English holds paramount significance in the contemporary global landscape due to its multifaceted roles. As the lingua franca of international communication, it bridges linguistic divides, facilitating interactions in diverse spheres such as business, academia, and diplomacy. Its dominance in global business operations underscores its pivotal role in driving economic exchanges and fostering collaboration across borders. Moreover, English serves as the medium through which knowledge is disseminated, making proficiency indispensable for accessing educational resources and staying abreast of advancements in various fields.",
      "Culturally, it acts as a conduit for cross-cultural understanding, enabling individuals to engage with diverse perspectives and expressions worldwide. Additionally, in the realm of travel and tourism, English proficiency eases navigation and communication, enhancing the overall travel experience. Its prevalence in science and technology underscores its instrumental role in facilitating innovation and collaboration on a global scale. Ultimately, mastery of English not only unlocks myriad opportunities for personal and professional growth but also fosters interconnectedness in an increasingly globalized world.",
    ],
    width: "full",
  },
  {
    id: 3,
    title: "What is the difference between ELA and English?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/markus-spiske-I-0OS5iRp0Q-unsplash.jpg",
        width: "40rem",
        height: "30rem",
      },
    ],
    content: [
      "English is a language, while ELA is a subject that teaches students how to read, write, listen, and speak in English.",
      "English is the language spoken by people in the United States, Canada, and other English-speaking countries. ELA is the study of that language.",
      "ELA is an important subject because it teaches students how to communicate effectively in English. It helps them develop the skills they need to succeed in school and in life.",
    ],
  },
];

const blog_data_two: IndividualBlogData[] = [
  {
    id: 4,
    title: "Why is ELA important?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg",
        width: "40rem",
        height: "30rem",
      },
    ],
    content: [
      "Overall, English Language Arts are vital for individuals to be able to communicate their thoughts and ideas effectively. It is an essential skill for success in many academic disciplines like history, philosophy, and the sciences. Furthermore, many professions, such as law, business, and journalism, require a good command of the English language. Now you know why the English Language Arts is important. It helps one succeed both academically and professionally. And if you are an avid traveler, knowing English will definitely come in handy when you visit English-speaking countries! So what are you waiting for? Start honing your English language arts skills today!",
      "Perhaps NCTE member Dana Maloney puts it best: “We teach the most essential human skills: how to receive information from others and how to transmit information. This is literacy. Through reading and listening, we receive information; through writing and speaking, we transmit information.” Learning to communicate is one of the most basic of human accomplishments. When we can’t clearly express our own ideas to others, we leave ourselves open to misinterpretation and misunderstanding. If we can’t read well, we miss out on much valuable information. Being able to think, speak, read, and write clearly is absolutely vital in our society. More than that, language arts encourage creativity and freedom of expression.",
    ],
  },
  {
    id: 5,
    title: "How can I improve my ELA skills?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/foad-roshan-gvavzXpmnC0-unsplash.jpg",
        width: "40rem",
        height: "30rem",
      },
    ],
    content: [
      "There are many ways to improve your ELA skills. Here are a few tips to help you get started:",
      "Read every day. Reading is one of the best ways to improve your ELA skills. It helps you develop your vocabulary, improve your reading comprehension, and learn how to analyze and interpret texts.",
      "Write every day. Writing is another important skill to develop. It helps you improve your grammar, punctuation, and spelling. It also helps you develop your critical thinking skills and learn how to express your ideas clearly and concisely.",
      "Practice listening and speaking. Listening and speaking are also important skills to develop. They help you improve your communication skills and learn how to express yourself effectively in English.",
    ],
  },
  {
    id: 6,
    title: "How visuals support ELA",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/alex-litvin-MAYsdoYpGuk-unsplash.jpg",
        width: "40rem",
        height: "30rem",
      },
    ],
    content: [
      "As educators, we know how important multiple means of representation are to effective teaching. 80% of the information we process is visual, and yet most literacy in classrooms focuses on reading words, rather than reading images or other visual representations.",
      "As our world becomes increasingly digital, students are tasked with even more visual input. Now, more than ever, students are reading more than words every day and need to be able to show their thinking in a variety of ways through a variety of media",
    ],
  },
];

export { blog_data_one, blog_data_two };
