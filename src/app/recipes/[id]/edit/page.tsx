import EditRecipeClient from '../../../../components/EditRecipeClient';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditRecipeClient id={id} />;
}
