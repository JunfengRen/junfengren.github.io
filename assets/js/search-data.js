// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-mathematical-foundations-for-transformers",
        
          title: "Mathematical Foundations for Transformers",
        
        description: "Detailed study notes on the mathematics behind Transformer models, including attention, softmax, positional encoding, optimization, and efficient token computation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/Mathfortrans/";
          
        },
      },{id: "post-mathematical-foundations-for-machine-learning-and-computer-vision",
        
          title: "Mathematical Foundations for Machine Learning and Computer Vision",
        
        description: "Detailed study notes on linear algebra, probability, and optimization for machine learning and computer vision.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/Math/";
          
        },
      },{id: "post-building-my-phd-knowledge-base-for-computer-vision",
        
          title: "Building My PhD Knowledge Base for Computer Vision",
        
        description: "A structured roadmap of the theoretical foundations required for PhD interviews in computer vision and autonomous driving.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/First/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-jetson-based-autonomous-driving-system",
          title: 'Jetson-Based Autonomous Driving System',
          description: "Embedded autonomous driving platform integrating perception, planning, and control on NVIDIA Jetson",
          section: "Projects",handler: () => {
              window.location.href = "/projects/AD/";
            },},{id: "projects-embedded-face-recognition-access-control-system",
          title: 'Embedded Face Recognition Access Control System',
          description: "Edge AI access control system with lightweight face recognition on STM32 microcontrollers",
          section: "Projects",handler: () => {
              window.location.href = "/projects/EdgeCompute/";
            },},{id: "projects-federated-learning-for-medical-image-segmentation-with-domain-generalization",
          title: 'Federated Learning for Medical Image Segmentation with Domain Generalization',
          description: "Federated medical image segmentation with domain generalization and style transfer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/FedDG/";
            },},{id: "projects-learning-to-merge-tokens-for-communication-efficient-collaborative-occupancy-prediction",
          title: 'Learning to Merge Tokens for Communication-Efficient Collaborative Occupancy Prediction',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/LiteTokenOcc/";
            },},{id: "projects-nao-robot-autonomous-ball-search-and-kick-system",
          title: 'NAO Robot Autonomous Ball Search and Kick System',
          description: "Embodied intelligence project implementing autonomous ball search and kicking on NAO humanoid robots for robotic soccer competitions",
          section: "Projects",handler: () => {
              window.location.href = "/projects/NAO/";
            },},{id: "projects-rate-distortion-in-efficient-multi-agent-perception-a-unified-framework-for-communication-and-memory-optimization",
          title: 'Rate-Distortion in Efficient Multi-Agent Perception: A Unified Framework for Communication and Memory Optimization...',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/RD/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/example_pdf.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%75%6E%66%65%6E%67%72%65%6E%33%32%35%33@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/JunfengRen", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
