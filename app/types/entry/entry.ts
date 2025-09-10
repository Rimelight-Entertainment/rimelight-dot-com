import type { BlockData } from "@/types/blocks";

/**
 * Interface for the data returned for each matching entry in search results.
 */
export interface EntrySearchData {
  id: string;
  slug: string;
  title: string;
  type: EntryType;
}

/**
 * Interface for the overall search results, categorizing matches.
 */
export interface EntrySearchResults {
  matchingTitles: EntrySearchData[];
  matchingCategories: EntrySearchData[];
  matchingTags: EntrySearchData[];
}

/**
 * Interface for search parameters.
 */
export interface EntrySearchParams {
  query: string;
}

export enum EntryType {
  DEFAULT = "Default",
  POLICY = "Policy",
  SPECIES = "Species",
  CHARACTER = "Character",
  OBJECT = "Object",
  TALE = "Tale",
  ITEM = "Item",
  SKILL = "Skill",
  HERO = "Hero",
  CARD = "Card",
  SERIES = "Series",
  EPISODE = "Episode",
}

export enum EntryCategory {
  UNCATEGORIZED = "Uncategorized",
  POLICY = "Policy",
  SPECIES = "Species",
  CHARACTER = "Character",
  OBJECT = "Object",
  TALE = "Tale",
  ITEM = "Item",
  SKILL = "Skill",
  HERO = "Hero",
  CARD = "Card",
  SERIES = "Series",
  EPISODE = "Episode",
}

// Defines the schema for how to display each property in a Property Panel
export interface PropertyPanelSchema {
  label: string; // The human-readable label to display
  type: "number" | "text" | "text-array" | "enum" | "entry" | "entry-array"; // Type of data/renderer
  options?: string[]; // Optional: For 'enum' type, defines the available options
  allowedEntryTypes?: EntryType[]; // Required for types "entry" and "entry-array", specifies the EntryType to link to
  order?: number; // Optional display order for properties within a category
}

/**
 * Interface for the overall search results, categorizing matches.
 */
export interface SearchResults {
  matchingTitles: EntrySearchData[];
  matchingCategories: EntrySearchData[];
  matchingTags: EntrySearchData[];
}
export interface EntryData {
  id: string;
  slug: string;
  title: string;
  type: EntryType;
  tags: string[];
  categories: EntryCategory[];
  properties: Record<string, unknown>;
  lastModified?: string;
  blocks: BlockData[];
}

interface BaseEntryTemplate {
  entryType: EntryType;
  defaultTitle: string;
  defaultCategories: EntryCategory[];
  defaultTags: string[];
  defaultProperties: Record<string, unknown>;
  defaultBlocks: BlockData[];
  propertyPanelSchema?: Record<string, Record<string, PropertyPanelSchema>>;
}

export interface PolicyProperties {
  [key: string]: unknown;
}

export interface SpeciesProperties {
  name: string;
  averageLifespan?: string;
  averageWeight?: number;
  diet?: string;
  status?: string;

  [key: string]: unknown;
}

export interface CharacterProperties {
  name: string;
  title?: string;
  aliases?: string[];
  flavourText?: string;
  species?: string;
  sex?: string;
  pronouns?: string;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
  dateOfDeath?: string;
  placeOfBirth?: string;
  placeOfDeath?: string;
  formerAffiliations?: string[];
  currentAffiliations?: string[];
  equipment?: string[];
  pets?: string[];
  mounts?: string[];
  favouriteFood?: string;

  [key: string]: unknown;
}

export interface ObjectProperties {
  [key: string]: unknown;
}

export interface TaleProperties {
  [key: string]: unknown;
}

export interface ItemProperties {
  [key: string]: unknown;
}

export interface SkillProperties {
  [key: string]: unknown;
}

export interface HeroProperties {
  character: string;

  [key: string]: unknown;
}

export interface CardProperties {
  name: string;
  alignment: string;
  type: string;
  flavourText: string;

  [key: string]: unknown;
}

export interface SeriesProperties {
  [key: string]: unknown;
}

export interface EpisodeProperties {
  [key: string]: unknown;
}

export interface SpeciesEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.SPECIES;
  defaultProperties: SpeciesProperties;
}

export interface CharacterEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.CHARACTER;
  defaultProperties: CharacterProperties;
}

export interface TaleEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.TALE;
  defaultProperties: TaleProperties;
}

export interface ItemEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.ITEM;
  defaultProperties: ItemProperties;
}

export interface SkillEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.SKILL;
  defaultProperties: SkillProperties;
}

export interface HeroEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.HERO;
  defaultProperties: HeroProperties;
}

export interface CardEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.CARD;
  defaultProperties: CardProperties;
}

export interface SeriesEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.SERIES;
  defaultProperties: SeriesProperties;
}

export interface EpisodeEntryTemplate extends BaseEntryTemplate {
  entryType: EntryType.EPISODE;
  defaultProperties: EpisodeProperties;
}

export type CombinedEntryTemplate =
  | BaseEntryTemplate
  | SpeciesEntryTemplate
  | CharacterEntryTemplate
  | TaleEntryTemplate
  | ItemEntryTemplate
  | SkillEntryTemplate
  | HeroEntryTemplate
  | CardEntryTemplate
  | SeriesEntryTemplate
  | EpisodeEntryTemplate;
