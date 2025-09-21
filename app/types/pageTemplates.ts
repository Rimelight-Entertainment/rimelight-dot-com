import {
  ArticleType,
  type PropertyPanelSchema,
  type SpeciesProperties,
  type CharacterProperties,
  type ObjectProperties,
  type TaleProperties,
  type ItemProperties,
  type SkillProperties,
  type HeroProperties,
  type CardProperties,
  type SeriesProperties,
  type EpisodeProperties
} from "../../types/article/article"
import type { BlockData, SectionBlockData } from "../../types/blocks/index"
import { v7 as uuidv7 } from "uuid"

interface ArticleTemplate {
  articleType: ArticleType
  defaultTitle: string
  defaultTags: string[]
  defaultProperties: Record<string, unknown>
  defaultBlocks: BlockData[]
  propertyPanelSchema?: Record<string, Record<string, PropertyPanelSchema>>
}

export const articleTemplates: Record<ArticleType, ArticleTemplate> = {
  [ArticleType.DEFAULT]: {
    articleType: ArticleType.DEFAULT,
    defaultTitle: `New Article`,
    defaultTags: [],
    defaultProperties: {},
    defaultBlocks: []
  },
  [ArticleType.SPECIES]: {
    articleType: ArticleType.SPECIES,
    defaultTitle: `New Species`,
    defaultTags: [],
    defaultProperties: {
      name: ``,
      averageLifespan: `Years`,
      averageWeight: 0,
      diet: ``
    } as SpeciesProperties,
    propertyPanelSchema: {
      Naming: {
        name: {
          label: `Name`,
          type: `text`,
          order: 10
        }
      },
      Characteristics: {
        averageLifespan: {
          label: `Average Lifespan`,
          type: `enum`,
          options: [
            `Seconds`,
            `Minutes`,
            `Hours`,
            `Days`,
            `Months`,
            `Years`,
            `Decades`,
            `Centuries`,
            `Millennia`
          ],
          order: 20
        },
        averageWeight: {
          label: `Average Weight (kg)`,
          type: `number`,
          order: 40
        },
        diet: {
          label: `Diet`,
          type: `enum`,
          options: [
            `Omnivorous`,
            `Carnivorous`,
            `Herbivorous`,
            `Fungivorous`,
            `Spritavorous`
          ],
          order: 30
        }
      },
      _uncategorized_: {
        status: {
          label: `Status`,
          type: `enum`,
          options: [`Extinct`, `Extant`],
          order: 50
        }
      }
    },
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Physiology`
        },
        isTemplated: true
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Culture`
        },
        isTemplated: true
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.CHARACTER]: {
    articleType: ArticleType.CHARACTER,
    defaultTitle: `New Character`,
    defaultTags: [`character`],
    defaultProperties: {
      name: ``,
      title: ``,
      aliases: [],
      flavourText: ``,
      species: ``,
      sex: ``,
      pronouns: ``,
      height: 0,
      weight: 0,
      dateOfBirth: ``,
      dateOfDeath: ``,
      placeOfBirth: ``,
      placeOfDeath: ``,
      formerAffiliations: [],
      currentAffiliations: [],
      equipment: [],
      pets: [],
      mounts: [],
      favouriteFood: ``
    } as CharacterProperties,
    propertyPanelSchema: {
      Naming: {
        name: {
          label: `Name`,
          type: `text`,
          order: 10
        },
        pronouns: {
          label: `Pronouns`,
          type: `enum`,
          options: [`He / Him`, `She / Her`, `They / Them`],
          order: 20
        },
        title: {
          label: `Title`,
          type: `text`,
          order: 30
        },
        aliases: {
          label: `Aliases`,
          type: `text-array`,
          order: 40
        },
        flavourText: {
          label: `Flavour Text`,
          type: `text`,
          order: 50
        }
      },
      Characteristics: {
        species: {
          label: `Species`,
          type: `article`,
          allowedArticleTypes: [ArticleType.SPECIES],
          order: 60
        },
        sex: {
          label: `Sex`,
          type: `enum`,
          options: [`Male`, `Female`, `None`],
          order: 70
        },
        height: {
          label: `Height (cm)`,
          type: `number`,
          order: 80
        },
        weight: {
          label: `Weight (kg)`,
          type: `number`,
          order: 90
        }
      },
      Timeline: {
        dateOfBirth: {
          label: `Date of Birth`,
          type: `text`,
          order: 100
        },
        dateOfDeath: {
          label: `Date of Death`,
          type: `text`,
          order: 110
        },
        placeOfBirth: {
          label: `Place of Birth`,
          type: `text`,
          order: 120
        },
        placeOfDeath: {
          label: `Place of Death`,
          type: `text`,
          order: 130
        }
      },
      Affiliations: {
        formerAffiliations: {
          label: `Former Affiliations`,
          type: `text-array`,
          order: 130
        },
        currentAffiliations: {
          label: `Current Affiliations`,
          type: `text-array`,
          order: 140
        }
      },
      _uncategorized_: {
        equipment: {
          label: `Equipment`,
          type: `text-array`,
          order: 150
        },
        pets: {
          label: `Pets`,
          type: `article-array`,
          allowedArticleTypes: [ArticleType.CHARACTER],
          order: 160
        },
        mounts: {
          label: `Mounts`,
          type: `text-array`,
          order: 170
        },
        favouriteFood: {
          label: `Favourite Food`,
          type: `article`,
          allowedArticleTypes: [ArticleType.SPECIES],
          order: 180
        }
      }
    },
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Appearance`
        },
        isTemplated: true
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Personality`
        },
        isTemplated: true
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Abilities`
        },
        isTemplated: true
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Biography`
        },
        isTemplated: true
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Relationships`
        },
        isTemplated: true
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.OBJECT]: {
    articleType: ArticleType.OBJECT,
    defaultTitle: `New Object`,
    defaultTags: [],
    defaultProperties: {} as ObjectProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.TALE]: {
    articleType: ArticleType.TALE,
    defaultTitle: `New Tale`,
    defaultTags: [],
    defaultProperties: {} as TaleProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.ITEM]: {
    articleType: ArticleType.ITEM,
    defaultTitle: `New Item`,
    defaultTags: [],
    defaultProperties: {} as ItemProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.SKILL]: {
    articleType: ArticleType.SKILL,
    defaultTitle: `New Skill`,
    defaultTags: [],
    defaultProperties: {} as SkillProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.HERO]: {
    articleType: ArticleType.HERO,
    defaultTitle: `New Hero`,
    defaultTags: [],
    defaultProperties: {} as HeroProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.CARD]: {
    articleType: ArticleType.CARD,
    defaultTitle: `New Card`,
    defaultTags: [],
    defaultProperties: {
      name: ``,
      alignment: ``,
      type: ``,
      flavourText: ``
    } as CardProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.SERIES]: {
    articleType: ArticleType.SERIES,
    defaultTitle: `New Series`,
    defaultTags: [],
    defaultProperties: {} as SeriesProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  },
  [ArticleType.EPISODE]: {
    articleType: ArticleType.EPISODE,
    defaultTitle: `New Episode`,
    defaultTags: [],
    defaultProperties: {} as EpisodeProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: `section`,
        attrs: {
          title: `Trivia`
        },
        isTemplated: true
      } as SectionBlockData
    ]
  }
}
