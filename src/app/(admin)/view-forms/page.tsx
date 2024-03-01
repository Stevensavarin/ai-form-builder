"use client"

import React, { useState, useEffect } from 'react';
import FormsList from '@/app/forms/FormsList';
import { getUserForms } from '@/app/actions/getUserForms';
import { InferSelectModel } from 'drizzle-orm';
import { forms as dbForms } from "@/db/schema";

type Props = {}

const Page = (props: Props) => {
  const [forms, setForms] = useState<InferSelectModel<typeof dbForms>[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userForms = await getUserForms();
        setForms(userForms);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching forms. Please try again.');
        setForms(null);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error && <div>Error: {error}</div>}
      {forms && <FormsList forms={forms} />}
    </>
  );
}

export default Page;
