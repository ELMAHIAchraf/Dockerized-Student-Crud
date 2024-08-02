export type FieldType = {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    cin: string;
  };
export type Student = {
    _id?: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    cin: string;
  }

export type Response = {
    message: string,
    student : Student
}