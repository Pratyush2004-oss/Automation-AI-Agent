export type UserType = {
    _id: string,
    name: string,
    email: string,
    profilePic: string,
    firebaseUID: string,
    createdAt: string,
    updatedAt: string
}

export type loginServiceResponseType = {
    user: UserType,
    message: string
}

export type UserState = {
    user: UserType | null
}