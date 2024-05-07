import { db } from "@/firebaseConfig";
import { CollectionReference, DocumentData, DocumentReference, collection, doc } from "firebase/firestore";

type CollectionNames = "messages" | "profiles" | "test";

export function typedCollectionRef<T = DocumentData>(collectionName: CollectionNames){
  return collection(db, collectionName) as CollectionReference<T>
}

export function typedDocumentRef<T = DocumentData>(collectionName: CollectionNames, documentId: string) {
  return doc(db, collectionName, documentId) as DocumentReference<T>
}

