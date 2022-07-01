import { FC, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Attributes, validateAttributes } from "../models";
import { Button, Container, Form } from "react-bootstrap";
import { TextEdit } from "./TextEdit";

interface Props {
  handleForm: (data: Attributes) => void;
  formValues?: Attributes;
}

export const FormContainer: FC<Props> = ({ handleForm, formValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Attributes>({
    resolver: yupResolver(validateAttributes),
  });

  useMemo(() => reset(formValues), [formValues]);

  const onSubmit: SubmitHandler<Attributes> = (data) => {
    handleForm(data);
    reset();
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            id="urlImg"
            {...register("urlImg")}
            placeholder="Image"
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            {errors.urlImg && <p>{errors.urlImg.message}</p>}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            {...register("name")}
            placeholder="Name"
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            {errors.name && <p>{errors.name.message}</p>}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            id="description"
            {...register("description")}
            placeholder="Description"
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            {errors.description && <p>{errors.description.message}</p>}
          </Form.Text>
        </Form.Group>

        <TextEdit />

        <Form.Group className="mb-3">
          <Form.Label>View Profile</Form.Label>
          <Form.Control
            type="text"
            id="urlBtnVer"
            {...register("urlBtnVer")}
            placeholder="Ver Perfil"
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            {errors.urlBtnVer && <p>{errors.urlBtnVer.message}</p>}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};
