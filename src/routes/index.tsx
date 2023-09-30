import { component$ } from "@builder.io/qwik";
import { Form, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";

import csv from 'csvtojson';

export const useSubmit = routeAction$(async( form, event ) => {

  const formData = await event.request.formData();
  const file = formData.get('upload') as File;

  if ( file.size === 0 ) return { success: false };

  const fileContent = await file.text();

  const data = await csv().fromString(fileContent);

  data.forEach( row => console.log( `${row.City} ${ row.State }` ));
  

  return {
    success: true
  }
})



export default component$(() => {

  const action = useSubmit();


  return (
    <>
      <span>Cargar un archivo</span>

      <Form action={ action }>
        <input type="file" name="upload" accept=".csv" />
        <button type="submit">Cargar</button>
      </Form>


    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
