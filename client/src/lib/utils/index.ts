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

export const getRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

//This is a work around for @html not working properly after hydration
export const innerHTML = (node: Element, html:string) => {
    node.innerHTML = html
}