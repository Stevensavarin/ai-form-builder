import React from 'react'
import FormsList from '@/app/forms/FormsList'
import { getUserForms } from '@/app/actions/getUserForms'
import { InferSelectModel } from 'drizzle-orm'
import { forms as dbForms } from "@/db/schema";

type Props = {
  forms: InferSelectModel<typeof dbForms>[];
}

const Page = ({ forms }: Props) => {
  return (
    <>
      <FormsList forms={forms} />
    </>
  )
}

export default Page;

export async function getServerSideProps() {
  try {
    const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();
    return {
      props: {
        forms
      }
    }
  } catch (error) {
    console.error("Error fetching user forms:", error);
    return {
      props: {
        forms: []
      }
    }
  }
}
