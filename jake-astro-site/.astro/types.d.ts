declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"flash-games": {
"age-of-war.md": {
	id: "age-of-war.md";
  slug: "age-of-war";
  body: string;
  collection: "flash-games";
  data: InferEntrySchema<"flash-games">
} & { render(): Render[".md"] };
"motherload.md": {
	id: "motherload.md";
  slug: "motherload";
  body: string;
  collection: "flash-games";
  data: InferEntrySchema<"flash-games">
} & { render(): Render[".md"] };
"sniper-assassin-4.md": {
	id: "sniper-assassin-4.md";
  slug: "sniper-assassin-4";
  body: string;
  collection: "flash-games";
  data: InferEntrySchema<"flash-games">
} & { render(): Render[".md"] };
"tanks.md": {
	id: "tanks.md";
  slug: "tanks";
  body: string;
  collection: "flash-games";
  data: InferEntrySchema<"flash-games">
} & { render(): Render[".md"] };
"worlds-hardest-game.md": {
	id: "worlds-hardest-game.md";
  slug: "worlds-hardest-game";
  body: string;
  collection: "flash-games";
  data: InferEntrySchema<"flash-games">
} & { render(): Render[".md"] };
};
"models": {
"baseball.md": {
	id: "baseball.md";
  slug: "baseball";
  body: string;
  collection: "models";
  data: InferEntrySchema<"models">
} & { render(): Render[".md"] };
"bugatti.md": {
	id: "bugatti.md";
  slug: "bugatti";
  body: string;
  collection: "models";
  data: InferEntrySchema<"models">
} & { render(): Render[".md"] };
"spacesuit.md": {
	id: "spacesuit.md";
  slug: "spacesuit";
  body: string;
  collection: "models";
  data: InferEntrySchema<"models">
} & { render(): Render[".md"] };
};
"posts": {
"rsturn.md": {
	id: "rsturn.md";
  slug: "rsturn";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"rust.md": {
	id: "rust.md";
  slug: "rust";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};
"projects": {
"arcade.md": {
	id: "arcade.md";
  slug: "arcade";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"photo-pin.md": {
	id: "photo-pin.md";
  slug: "photo-pin";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};
"shoes": {
"converse.md": {
	id: "converse.md";
  slug: "converse";
  body: string;
  collection: "shoes";
  data: InferEntrySchema<"shoes">
} & { render(): Render[".md"] };
"low-top.md": {
	id: "low-top.md";
  slug: "low-top";
  body: string;
  collection: "shoes";
  data: InferEntrySchema<"shoes">
} & { render(): Render[".md"] };
"mid-top.md": {
	id: "mid-top.md";
  slug: "mid-top";
  body: string;
  collection: "shoes";
  data: InferEntrySchema<"shoes">
} & { render(): Render[".md"] };
"nike.md": {
	id: "nike.md";
  slug: "nike";
  body: string;
  collection: "shoes";
  data: InferEntrySchema<"shoes">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
