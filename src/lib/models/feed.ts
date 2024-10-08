export interface FeedData {
	AuthorId: string
	Title: string
	Secret: string
}

export interface Feed extends FeedData {
	ID: number
}
