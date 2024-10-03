import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import { useCreateProduct } from "../features/products/useCreatePoroduct";
import { useUpdateProduct } from "../features/products/useUpdateProduct";
const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  //border: 3px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
  z-index: 999;
`;
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 1fr 10rem;
  gap: 1rem;
  font-size: 1.2rem;
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  padding: 1.2rem 3.2rem;
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
//i included closewindow here , its come from Modal.window its clone here child and pass closewindow to it , so UploadProduct is the child
function UploadProduct({ closewindow, productToEdit = {} }) {
  const { _id: editId, ...editValues } = productToEdit;
  // console.log(editId);
  const isEditSession = Boolean(editId);
  const { createProduct, isLoading: isUploading } = useCreateProduct();
  const { updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const isLoading = isUploading || isUpdating;
  // function onSubmit({
  //   id,
  //   title,
  //   price,
  //   image,
  //   description,
  //   quantity,
  //   category,
  // }) {
  //   createProduct(
  //     { id, title, price, image, description, quantity, category },
  //     { onSettled: () => reset() }
  //   );
  //   closewindow?.();
  // }
  function onSubmit(data) {
    if (isEditSession) {
      //console.log(data);
      updateProduct(
        { dataObj: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            closewindow?.();
          },
        }
      );
    } else {
      createProduct(
        { ...data },
        {
          onSuccess: () => {
            reset();
            closewindow?.();
          },
        }
      );
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="id">ID</Label>
        <Input
          type="number"
          id="id"
          {...register("id", { required: "this field is required" })}
          disabled={isLoading}
        />
        {errors?.id?.message && <Error>{errors.id.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="title">TITLE</Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "this filed is required",
          })}
          disabled={isLoading}
        />
        {errors?.title?.message && <Error>{errors.title.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="price">PRICE</Label>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "this field is required",
          })}
          disabled={isLoading}
        />
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="image">IMAGE</Label>
        <Input
          type="text"
          id="image"
          {...register("image", {
            required: "this field is required",
          })}
          disabled={isLoading}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="description">description</Label>
        <Input
          type="text"
          id="description"
          {...register("description", {
            required: "this field is required",
          })}
          disabled={isLoading}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="quantity">quantity</Label>
        <Input
          type="number"
          id="quantity"
          {...register("quantity", {
            required: "this field is required",
          })}
          disabled={isLoading}
        />
        {errors?.quantity?.message && <Error>{errors.quantity.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="category">category</Label>
        <Input
          type="text"
          id="category"
          {...register("category", {
            required: "this field is required",
          })}
          disabled={isLoading}
        />
        {errors?.category?.message && <Error>{errors.category.message}</Error>}
      </FormRow>
      <FormRow>
        <Button disabled={isLoading} variations="primary">
          Upload
        </Button>
        <Button
          disabled={isLoading}
          type="reset"
          onClick={() => closewindow?.()}
          variations="primary"
        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}
export default UploadProduct;
