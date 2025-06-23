import type { Contact, ContactType } from "./types";

export const backHandler = () => {
    window.history.back();
}

export const validateEmail = (input: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(input) ? null : 'Please enter a correct email format'
}

export const didCurrentUserVote = (vote_type: 'upvote'| 'downvote' | undefined | null): { liked: boolean, disliked: boolean } => {
  return { liked: vote_type === "upvote", disliked: vote_type === "downvote" }
}

export const findContact = (contacts: Contact[], type:  ContactType): string | undefined => {
  const contact: Contact | undefined = contacts.find(
    (contactItem: Contact) => contactItem.contact_type === type
  );

  return contact?.value ?? undefined;
};