export interface FeedData {
	author_sub: string
	title: string
	secret: string
}

export interface Feed extends FeedData {
	id: number
}
