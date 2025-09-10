import {
  EntryType,
  EntryCategory,
  type PropertyPanelSchema,
  type PolicyProperties,
  type SpeciesProperties,
  type CharacterProperties,
  type ObjectProperties,
  type TaleProperties,
  type ItemProperties,
  type SkillProperties,
  type HeroProperties,
  type CardProperties,
  type SeriesProperties,
  type EpisodeProperties,
} from "../../types/entry/entry";
import { type BlockData, type SectionBlockData } from "../../types/blocks/index";
import { v7 as uuidv7 } from "uuid";

interface EntryTemplate {
  entryType: EntryType;
  defaultTitle: string;
  defaultCategories: EntryCategory[];
  defaultTags: string[];
  defaultProperties: Record<string, unknown>;
  defaultBlocks: BlockData[];
  propertyPanelSchema?: Record<string, Record<string, PropertyPanelSchema>>;
}

export const entryTemplates: Record<EntryType, EntryTemplate> = {
  [EntryType.DEFAULT]: {
    entryType: EntryType.DEFAULT,
    defaultTitle: "New Entry",
    defaultCategories: [EntryCategory.UNCATEGORIZED],
    defaultTags: [],
    defaultProperties: {},
    defaultBlocks: [],
  },
  [EntryType.POLICY]: {
    entryType: EntryType.POLICY,
    defaultTitle: "New Policy",
    defaultCategories: [EntryCategory.POLICY],
    defaultTags: [],
    defaultProperties: {} as PolicyProperties,
    propertyPanelSchema: {},
    defaultBlocks: [],
  },
  [EntryType.SPECIES]: {
    entryType: EntryType.SPECIES,
    defaultTitle: "New Species",
    defaultCategories: [EntryCategory.SPECIES],
    defaultTags: [],
    defaultProperties: {
      name: "",
      averageLifespan: "Years",
      averageWeight: 0,
      diet: "",
    } as SpeciesProperties,
    propertyPanelSchema: {
      Naming: {
        name: {
          label: "Name",
          type: "text",
          order: 10,
        },
      },
      Characteristics: {
        averageLifespan: {
          label: "Average Lifespan",
          type: "enum",
          options: [
            "Seconds",
            "Minutes",
            "Hours",
            "Days",
            "Months",
            "Years",
            "Decades",
            "Centuries",
            "Millennia",
          ],
          order: 20,
        },
        averageWeight: {
          label: "Average Weight (kg)",
          type: "number",
          order: 40,
        },
        diet: {
          label: "Diet",
          type: "enum",
          options: [
            "Omnivorous",
            "Carnivorous",
            "Herbivorous",
            "Fungivorous",
            "Spritavorous",
          ],
          order: 30,
        },
      },
      _uncategorized_: {
        status: {
          label: "Status",
          type: "enum",
          options: ["Extinct", "Extant"],
          order: 50,
        },
      },
    },
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Physiology",
        },
        isTemplated: true,
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Culture",
        },
        isTemplated: true,
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.CHARACTER]: {
    entryType: EntryType.CHARACTER,
    defaultTitle: "New Character",
    defaultCategories: [EntryCategory.CHARACTER],
    defaultTags: ["character"],
    defaultProperties: {
      name: "",
      title: "",
      aliases: [],
      flavourText: "",
      species: "",
      sex: "",
      pronouns: "",
      height: 0,
      weight: 0,
      dateOfBirth: "",
      dateOfDeath: "",
      placeOfBirth: "",
      placeOfDeath: "",
      formerAffiliations: [],
      currentAffiliations: [],
      equipment: [],
      pets: [],
      mounts: [],
      favouriteFood: "",
    } as CharacterProperties,
    propertyPanelSchema: {
      Naming: {
        name: {
          label: "Name",
          type: "text",
          order: 10,
        },
        pronouns: {
          label: "Pronouns",
          type: "enum",
          options: ["He / Him", "She / Her", "They / Them"],
          order: 20,
        },
        title: {
          label: "Title",
          type: "text",
          order: 30,
        },
        aliases: {
          label: "Aliases",
          type: "text-array",
          order: 40,
        },
        flavourText: {
          label: "Flavour Text",
          type: "text",
          order: 50,
        },
      },
      Characteristics: {
        species: {
          label: "Species",
          type: "entry",
          allowedEntryTypes: [EntryType.SPECIES],
          order: 60,
        },
        sex: {
          label: "Sex",
          type: "enum",
          options: ["Male", "Female", "None"],
          order: 70,
        },
        height: {
          label: "Height (cm)",
          type: "number",
          order: 80,
        },
        weight: {
          label: "Weight (kg)",
          type: "number",
          order: 90,
        },
      },
      Timeline: {
        dateOfBirth: {
          label: "Date of Birth",
          type: "text",
          order: 100,
        },
        dateOfDeath: {
          label: "Date of Death",
          type: "text",
          order: 110,
        },
        placeOfBirth: {
          label: "Place of Birth",
          type: "text",
          order: 120,
        },
        placeOfDeath: {
          label: "Place of Death",
          type: "text",
          order: 130,
        },
      },
      Affiliations: {
        formerAffiliations: {
          label: "Former Affiliations",
          type: "text-array",
          order: 130,
        },
        currentAffiliations: {
          label: "Current Affiliations",
          type: "text-array",
          order: 140,
        },
      },
      _uncategorized_: {
        equipment: {
          label: "Equipment",
          type: "text-array",
          order: 150,
        },
        pets: {
          label: "Pets",
          type: "entry-array",
          allowedEntryTypes: [EntryType.CHARACTER],
          order: 160,
        },
        mounts: {
          label: "Mounts",
          type: "text-array",
          order: 170,
        },
        favouriteFood: {
          label: "Favourite Food",
          type: "entry",
          allowedEntryTypes: [EntryType.SPECIES],
          order: 180,
        },
      },
    },
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Appearance",
        },
        isTemplated: true,
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Personality",
        },
        isTemplated: true,
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Abilities",
        },
        isTemplated: true,
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Biography",
        },
        isTemplated: true,
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Relationships",
        },
        isTemplated: true,
      } as SectionBlockData,
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.OBJECT]: {
    entryType: EntryType.OBJECT,
    defaultTitle: "New Object",
    defaultCategories: [EntryCategory.OBJECT],
    defaultTags: [],
    defaultProperties: {} as ObjectProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.TALE]: {
    entryType: EntryType.TALE,
    defaultTitle: "New Tale",
    defaultCategories: [EntryCategory.TALE],
    defaultTags: [],
    defaultProperties: {} as TaleProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.ITEM]: {
    entryType: EntryType.ITEM,
    defaultTitle: "New Item",
    defaultCategories: [EntryCategory.ITEM],
    defaultTags: [],
    defaultProperties: {} as ItemProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.SKILL]: {
    entryType: EntryType.SKILL,
    defaultTitle: "New Skill",
    defaultCategories: [EntryCategory.SKILL],
    defaultTags: [],
    defaultProperties: {} as SkillProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.HERO]: {
    entryType: EntryType.HERO,
    defaultTitle: "New Hero",
    defaultCategories: [EntryCategory.HERO],
    defaultTags: [],
    defaultProperties: {} as HeroProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.CARD]: {
    entryType: EntryType.CARD,
    defaultTitle: "New Card",
    defaultCategories: [EntryCategory.CARD],
    defaultTags: [],
    defaultProperties: {
      name: "",
      alignment: "",
      type: "",
      flavourText: "",
    } as CardProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.SERIES]: {
    entryType: EntryType.SERIES,
    defaultTitle: "New Series",
    defaultCategories: [EntryCategory.SERIES],
    defaultTags: [],
    defaultProperties: {} as SeriesProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
  [EntryType.EPISODE]: {
    entryType: EntryType.EPISODE,
    defaultTitle: "New Episode",
    defaultCategories: [EntryCategory.EPISODE],
    defaultTags: [],
    defaultProperties: {} as EpisodeProperties,
    propertyPanelSchema: {},
    defaultBlocks: [
      {
        id: uuidv7(),
        type: "section",
        attrs: {
          title: "Trivia",
        },
        isTemplated: true,
      } as SectionBlockData,
    ],
  },
};
