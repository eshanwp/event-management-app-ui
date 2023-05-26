interface Event {
     id: string;
     eventName: string;
}

interface User {
     id: string;
     email: string;
}

export default interface EventReviewResponseModel {
     id: string;
     review: string;
     rate: number;
     event: Event;
     user: User;
}
