// app/recipes/[id]/edit/page.tsx
import EditRecipeClient from '../../../../components/EditRecipeClient';

export default function EditPage({ params }: { params: { id: string } }) {
  return <EditRecipeClient id={params.id} />;
}
