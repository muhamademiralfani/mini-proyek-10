// SchemaContext.tsx
import React, { createContext, useContext, ReactNode, Context } from 'react';

// Define types for schema data
interface SchemaData {
  [key: string]: {
    '@context': string;
    '@type': string;
    name: string;
    url: string;
    description: string;
  };
}

// Define the schema data
const schemaData: SchemaData = {
  homepage: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Home Page',
    url: 'https://furniture-lumosh.vercel.app/',
    description: 'Welcome to the home page of Our Website.',
  },
 
};

// Create context with the schema data type
const SchemaContext: Context<SchemaData> = createContext<SchemaData>(schemaData);

// Define props for SchemaProvider
interface SchemaProviderProps {
  children: ReactNode;
}

export const SchemaProvider: React.FC<SchemaProviderProps> = ({ children }) => {
  return <SchemaContext.Provider value={schemaData}>{children}</SchemaContext.Provider>;
};

export const useSchema = (): SchemaData => useContext(SchemaContext);
