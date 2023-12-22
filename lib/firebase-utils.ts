import { db } from "@/firebaseConfig";
import { CollectionReference, DocumentData, collection } from "firebase/firestore";


export function typedCollectionRef<T = DocumentData>(collectionName: string){
  return collection(db, collectionName) as CollectionReference<T>
}

