import { CreateTodoComponent } from "../../generated/apolloComponents";
import { Formik, Field } from "formik";
import { InputField } from "./inputField";
import { useState } from "react";
import { useEffect } from "react";

interface Props {
  groupId: number;
  path: string[];
  addTodo: any;
}

const newTodoForm: React.SFC<Props> = ({ groupId, path, addTodo }) => {
  const [pathPlaceHolder, setPathPlaceHolder] = useState<string>(
    path.join("/")
  );

  useEffect(() => {
    setPathPlaceHolder(path.join("/"));

    return () => {};
  }, [path]);

  return (
    <div>
      <CreateTodoComponent>
        {(createTodo) => (
          <Formik
            validateOnBlur={false}
            enableReinitialize={true}
            validateOnChange={false}
            onSubmit={async (data) => {
              const res = await createTodo({
                variables: {
                  data: {
                    ...data,
                    todoGroupId: groupId,
                    fileName: data.fileName || "",
                  },
                },
              });

              if (!res || !res.data || !res.data.createTodo) return;

              addTodo(res.data.createTodo);
            }}
            initialValues={{
              fileName: pathPlaceHolder,
              todoTitle: "",
              todoBody: "",
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="todoTitle"
                  placeholder="todo title"
                  component={InputField}
                />
                <Field
                  name="todoBody"
                  placeholder="todo body"
                  component={InputField}
                />
                <Field
                  name="fileName"
                  placeholder={"filename"}
                  component={InputField}
                />
                <button type="submit">create todo</button>
              </form>
            )}
          </Formik>
        )}
      </CreateTodoComponent>
    </div>
  );
};

export default newTodoForm;
