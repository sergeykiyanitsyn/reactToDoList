// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA5h62WNKc6lSNuzlRPF0swIQjdWtrviLA',
  authDomain: 'todoshka-18b62.firebaseapp.com',
  projectId: 'todoshka-18b62',
  storageBucket: 'todoshka-18b62.appspot.com',
  messagingSenderId: '817141175339',
  appId: '1:817141175339:web:00c591d1ceabcd408dc66e',
  databaseURL: 'https://todoshka-18b62-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
