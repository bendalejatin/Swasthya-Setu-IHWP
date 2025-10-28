import React from "react";
import "./Resources.css";

const Resources = () => {
  const resourceSections = [
    {
      title: "🧘 Yoga",
      links: [
        { label: "Yoga Basics for Beginners", url: "https://www.yogajournal.com/yoga-101" },
        { label: "Daily Yoga Routine", url: "https://www.artofliving.org/in-en/yoga/yoga-poses" },
        { label: "Yoga Asanas by Dosha Type", url: "https://www.banyanbotanicals.com/info/ayurvedic-living/living-ayurveda/yoga/" },
      ],
    },
    {
      title: "🌿 Ayurveda",
      links: [
        { label: "What is Ayurveda?", url: "https://www.ayurveda.com/resources/articles/what-is-ayurveda" },
        { label: "Daily Routine (Dinacharya)", url: "https://www.banyanbotanicals.com/info/ayurvedic-living/living-ayurveda/dinacharya/" },
        { label: "Ayurvedic Nutrition Guide", url: "https://www.ayurveda.com/resources/articles/eating-for-your-body-type" },
      ],
    },
    {
      title: "🧠 Mental Wellness",
      links: [
        { label: "Guided Meditations", url: "https://www.headspace.com/meditation/guided-meditation" },
        { label: "Managing Stress Holistically", url: "https://www.artofliving.org/in-en/mental-health" },
        { label: "Mindfulness Practices", url: "https://www.mindful.org/meditation/mindfulness-getting-started/" },
      ],
    },
    {
      title: "🌞 Daily Life Practices",
      links: [
        { label: "Healthy Daily Habits", url: "https://chopra.com/articles/the-ultimate-guide-to-building-better-habits" },
        { label: "Sleep, Diet, and Balance", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6466095/" },
        { label: "Balancing Work & Wellness", url: "https://www.psychologytoday.com/us/blog/click-here-happiness/202001/10-ways-balance-your-work-and-personal-life" },
      ],
    },
    {
  title: "🥗 Nutrition & Diet",
  links: [
    {
      label: "Ayurvedic Diet by Dosha",
      url: "https://www.banyanbotanicals.com/info/ayurvedic-living/living-ayurveda/dosha-quiz/"
    },
    {
      label: "Sattvic Food Explained",
      url: "https://isha.sadhguru.org/in/en/blog/article/sattvic-food-meaning-and-benefits"
    },
    {
      label: "Seasonal Eating in Ayurveda",
      url: "https://www.ayurveda.com/resources/articles/eating-for-the-season"
    }
  ]
},{
  title: "🌼 Natural Remedies & Self-Care",
  links: [
    {
      label: "Home Remedies for Common Ailments",
      url: "https://www.banyanbotanicals.com/info/blog-the-banyan-insight/details/home-remedies/"
    },
    {
      label: "Abhyanga (Oil Massage) Guide",
      url: "https://www.banyanbotanicals.com/info/ayurvedic-living/living-ayurveda/abhyanga/"
    },
    {
      label: "Herbs for Immunity & Balance",
      url: "https://www.ayurveda.com/resources/articles/ayurvedic-herbs-for-health"
    }
  ]
},
  ];

  return (
    <div className="resources-container">
      <div className="resource-hero">
        <div className="resource-hero-content">
          <h1>Holistic Wellness Resources</h1>
          <p>Curated content for your journey in Ayurveda, Yoga, and Mental Well-being.</p>
        </div>
      </div>
  
      <div className="resources-grid">
        {resourceSections.map((section, idx) => (
          <div key={idx} className="resource-card">
            <h3 className="resource-heading">{section.title}</h3>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
