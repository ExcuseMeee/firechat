import { db } from "@/firebaseConfig";
import { CollectionReference, DocumentData, DocumentReference, collection, doc } from "firebase/firestore";


export function typedCollectionRef<T = DocumentData>(collectionName: string){
  return collection(db, collectionName) as CollectionReference<T>
}

export function typedDocumentRef<T = DocumentData>(collectionName: string, documentId: string) {
  return doc(db, collectionName, documentId) as DocumentReference<T>
}

