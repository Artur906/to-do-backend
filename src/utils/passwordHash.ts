import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(7);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error: any) {
    console.log("Erro ao gerar hash de password: ", error.message)
  }
}

async () => console.log("hello hash", await hash("my_super pass word"))