interface User {
     id: string;
     email: string;
}

interface EventReviewResponseModel {
     id: string;
     review: string;
     rate: number;
     user: User;
}

export default interface EventResponseModel {
     id: string;
     eventName: string;
     eventDescription: string;
     startTime: string;
     endTime: string;
     eventReviews: EventReviewResponseModel[];
}
