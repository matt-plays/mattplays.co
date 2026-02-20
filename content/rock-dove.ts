export interface CreditColumn {
  label: string
  names: string[]
}

export interface ProjectItem {
  title: string
  role: string
  arrowUrl: string
}

export interface FooterLinkColumn {
  heading: string
  links: string[]
}

export interface PageContent {
  hero: {
    label: string
    title: string
    description: string
    role: string
    heroImage: string
    hrImage: string
  }
  strategy: {
    label: string
    body: string
  }
  images: {
    centered1: string
    fullBleed1: string
    centered2: string
    centered3: string
    fullBleed2: string
  }
  credits: CreditColumn[]
  projectList: ProjectItem[]
  footer: {
    logoUrl: string
    newsletter: {
      label: string
      placeholder: string
      buttonLabel: string
    }
    hrImage: string
    linkColumns: FooterLinkColumn[]
    origin: {
      geoIconUrl: string
      label: string
      logoUrl: string
    }
  }
}

const content: PageContent = {
  "hero": {
    "label": "Project",
    "title": "Hey baby, love you.",
    "description": "A system of modular website sections created for a start-from-scratch redesign of Burton.com",
    "role": "Art Direction, Design",
    "heroImage": "https://www.figma.com/api/mcp/asset/a751bd10-43d8-4d14-8372-990ce82379c8",
    "hrImage": "https://www.figma.com/api/mcp/asset/9d1695ed-dd0c-481f-9d42-4f42adfc2a61"
  },
  "strategy": {
    "label": "strategy",
    "body": "We set out to create a set of modules that could be stacked to create product-focused, easy-to-update pages. The Burton.com homepage and landing pages for Men, Women, Youth, and Bags are built, and constantly updated, using this system."
  },
  "images": {
    "centered1": "https://www.figma.com/api/mcp/asset/1c780cce-a4b4-4b0c-89ba-c0d2489a11d2",
    "fullBleed1": "https://www.figma.com/api/mcp/asset/1c780cce-a4b4-4b0c-89ba-c0d2489a11d2",
    "centered2": "https://www.figma.com/api/mcp/asset/1c780cce-a4b4-4b0c-89ba-c0d2489a11d2",
    "centered3": "https://www.figma.com/api/mcp/asset/1c780cce-a4b4-4b0c-89ba-c0d2489a11d2",
    "fullBleed2": "https://www.figma.com/api/mcp/asset/1c780cce-a4b4-4b0c-89ba-c0d2489a11d2"
  },
  "credits": [
    {
      "label": "Additional Design",
      "names": [
        "John Brown",
        "Andrew Lakata",
        "Ryan Forde"
      ]
    },
    {
      "label": "Additional Design",
      "names": [
        "John Brown",
        "Andrew Lakata",
        "Ryan Forde"
      ]
    },
    {
      "label": "Additional Design",
      "names": [
        "John Brown",
        "Andrew Lakata",
        "Ryan Forde"
      ]
    },
    {
      "label": "Additional Design",
      "names": [
        "John Brown",
        "Andrew Lakata",
        "Ryan Forde"
      ]
    }
  ],
  "projectList": [
    {
      "title": "Help Scout Brand Evolution",
      "role": "Creative Direction, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/3f8b9e72-83ae-4fd5-8f8d-47b7ac0d423b"
    },
    {
      "title": "In the Works",
      "role": "Art Direction, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/4b97167e-b375-437f-ba91-0ca742580fa3"
    },
    {
      "title": "Help Scout Microbrands",
      "role": "Art Direction, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/e89c7a25-ab09-4602-95b3-7b939eb8388c"
    },
    {
      "title": "Epicurrence",
      "role": "Art Direction, Brand Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/356b24f8-0df3-4ccc-a596-3ddebd97ffed"
    },
    {
      "title": "Acadia Type Hike",
      "role": "Art Direction, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/dabc5db7-a0a2-45a7-9165-da2a63ea6efe"
    },
    {
      "title": "Burton Seasonal Identities",
      "role": "Art Direction, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/e987c781-39fd-4f77-a252-1c08592b19e4"
    },
    {
      "title": "Burton Web Design",
      "role": "Web & System Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/18276e74-90fe-496a-a0ad-e31496e8a600"
    },
    {
      "title": "Burton Ads & Campaigns",
      "role": "Art Direction, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/5c439c3b-4243-4501-b4b7-fba7cde78332"
    },
    {
      "title": "Icon Snowskates",
      "role": "Co-founder, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/b53f2b90-0209-4b5f-b377-d5d34022ec32"
    },
    {
      "title": "The Island of Misfit Work",
      "role": "Art Direction, Design",
      "arrowUrl": "https://www.figma.com/api/mcp/asset/c21613d8-4dd5-43fc-96e5-6f76cc61c67d"
    }
  ],
  "footer": {
    "logoUrl": "https://www.figma.com/api/mcp/asset/2a536c82-00b3-43b2-b847-21d6432886d4",
    "newsletter": {
      "label": "Stay up to date with my new monthly newsletter, “One Cool Thing”",
      "placeholder": "your@email.com",
      "buttonLabel": "Subscribe"
    },
    "hrImage": "https://www.figma.com/api/mcp/asset/4d3dca87-d289-4f77-99f0-6f2533d78164",
    "linkColumns": [
      {
        "heading": "Connect",
        "links": [
          "Contact",
          "LinkedIn",
          "Email"
        ]
      },
      {
        "heading": "Explore",
        "links": [
          "Changelog",
          "Styleguide",
          "Colophon"
        ]
      },
      {
        "heading": "Follow",
        "links": [
          "Instagram",
          "Dribbble",
          "Twitter"
        ]
      }
    ],
    "origin": {
      "geoIconUrl": "https://www.figma.com/api/mcp/asset/e298a604-69dc-4867-888f-ce2ff180fcd7",
      "label": "made remotely in new england, usa",
      "logoUrl": "https://www.figma.com/api/mcp/asset/2beb1821-a12f-4901-a4e1-be8e2e713487"
    }
  }
}

export default content
