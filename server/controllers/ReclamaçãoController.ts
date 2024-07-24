import { Response, Request } from "express";
import { RequestAutenticado } from "../interfaces";
import { ObjectId } from "mongodb";
import {
  getByEscola,
  checkCurtida,
  curtir,
  descurtir,
  criar,
  getByUsuário,
  remover,
  list,
  limpar,
} from "../services/ReclamaçãoService";

export const loadReclamaçõesEscola = async (req: Request, res: Response) => {
  const resultado = await getByEscola(
    req.params.escola,
    parseInt(req.params.cidadeId)
  );
  if (resultado instanceof Error) {
    res.status(500).send({ mensagem: "Erro ao carregar as reclamações!" });
  } else {
    res.status(200).json(resultado);
  }
};

// Curtida
export const checkCurtidaReclamação = async (
  req: RequestAutenticado,
  res: Response
) => {
  if (!req.user || !req.params.reclamacaoid) res.status(400).end();
  if (req.user) {
    const curtido = await checkCurtida(
      new ObjectId(req.user.id),
      new ObjectId(req.params.reclamacaoid)
    );
    res.status(200).json(curtido);
  }
};

export const curtirReclamação = async (
  req: RequestAutenticado,
  res: Response
) => {
  if (!req.user || !req.params.reclamacaoid) res.status(400).end();
  if (req.user) {
    curtir(new ObjectId(req.user.id), new ObjectId(req.params.reclamacaoid));
    res.status(200).end();
  }
};

export const descurtirReclamação = async (
  req: RequestAutenticado,
  res: Response
) => {
  if (!req.user || !req.params.reclamacaoid) res.status(400).end();
  if (req.user) {
    descurtir(new ObjectId(req.user.id), new ObjectId(req.params.reclamacaoid));
    res.status(200).end();
  }
};

export const apagarReclamação = async (
  req: RequestAutenticado,
  res: Response
) => {
  const idUsuário = req.user?.id;
  if (!idUsuário) {
    return res.status(400).send("Faça login e tente novamente.");
  } else {
    const r = await remover(new ObjectId(req.params.id));
    if (r.deletedCount === 1)
      return res.status(200).send("Reclamação removida com sucesso!");
    else return res.status(400).send("Nenhuma reclamação removida!");
  }
};

export const novaReclamação = async (
  req: RequestAutenticado,
  res: Response
) => {
  const idUsuário = req.user?.id;
  try {
    const [escola, título, textoReclamacao] = [
      req.body.escola,
      req.body.titulo,
      req.body.texto,
    ];
    let fotos: string[] = [];

    if (título.length < 10) {
      throw new Error("Título muito curto!");
    }
    if (título.length > 50) {
      throw new Error("Título muito longo!");
    }
    if (textoReclamacao.length < 5) {
      throw new Error("Texto da reclamação muito curto!");
    }
    if (textoReclamacao.length > 200) {
      throw new Error("Texto da reclamação muito longo!");
    }

    if (Array.isArray(req.files) && req.files.length) {
      // Processar cada arquivo enviado
      for (const file of req.files) {
        const formData = new FormData();
        formData.append(
          `file`,
          new Blob([file.buffer], { type: file.mimetype })
        );

        // Enviar o arquivo para o servidor de upload
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error((await response.json()).message);
        }
        const res = await response.json();
        fotos.push(res.filename);
      }
    }

    if (escola && textoReclamacao && título) {
      //Adicionar checagem de limite de caracteres
      const resultado = await criar(
        escola,
        título,
        textoReclamacao,
        fotos,
        idUsuário
      );
      if (resultado instanceof Error) {
        return res
          .status(400)
          .send("Erro ao fazer a reclamação! Tente novamente.");
      }
      return res.status(200).send("Reclamação feita com sucesso!");
    } else {
      return res
        .status(400)
        .send("Preencha o formulário por completo e tente de novo.");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const loadReclamaçõesUsuário = async (
  req: RequestAutenticado,
  res: Response
) => {
  const usuárioId = req.user?.id;
  if (!usuárioId) return res.status(400).send("Usuário não logado.");
  return res.status(200).json(await getByUsuário(usuárioId));
};

export const listReclamações = async (req: Request, res: Response) => {
  const resultado = await list();
  if (resultado instanceof Error) {
    res.status(500).send({ mensagem: "Erro ao carregar as reclamações!" });
  } else {
    res.status(200).json(resultado);
  }
};

export const limparReclamações = async (req: Request, res: Response) => {
  await limpar();
  res.status(200).send({ mensagem: "Reclamações limpas!" });
};
