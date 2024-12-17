import React from 'react'
import { Header } from './components/Navbar'
import { NewsParent } from './components/NewParent';

export default function App() {
  return (
      <>
          <Header />
          <main className="grow">
              <NewsParent></NewsParent>
          </main>
      </>
  );
}
