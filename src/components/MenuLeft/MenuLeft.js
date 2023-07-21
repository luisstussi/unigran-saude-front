import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import "./MenuLeft.scss";

export default function MenuLeft() {
  const params = useParams();
  const navigate = useNavigate();

  const Li = styled.li`
    display: flex;
    grid-gap: 18px;
    align-items: center;
    padding: 10px 10px 10px 20px;
    border-radius: 9px;

    background-color: ${(props) =>
      params.title === props.className ? "#343434" : "transparent"};

    &:hover {
      background-color: ${(props) =>
        params.title === props.className ? "#343434" : "#3434344a"};
    }
  `;

  const logoff = () => {
    sessionStorage.removeItem("USER_TOKEN");
    window.location.reload();
  };

  return (
    <section className="divBackgroundMenuLeft">
      <i />

      <div>
        <div className="divMenu">
          <h1>Menu</h1>

          <ul>
            <Li className="scheduling" onClick={() => navigate("/scheduling")}>
              <img
                width={"25px"}
                height={"25px"}
                src="https://img.icons8.com/fluency-systems-regular/96/A5A5A5/crossed-out-date--v1.png"
                alt="Ícone de um calendário, sem cor de fundo, que possui três pontos na coluna superior e dois pontos na coluna inferior. Apenas bordas brancas"
              />
              <p>Agendamentos</p>
            </Li>
            <div className="divLiWithOptions">
              <Li className="working" onClick={() => navigate("/working")}>
                <img
                  width={"25px"}
                  height={"25px"}
                  src="https://img.icons8.com/fluency-systems-regular/96/A5A5A5/under-computer.png"
                  alt="Ícone de um usuário, sem cor de fundo, apenas bordas brancas"
                />
                <p>Funcionários</p>
              </Li>
              <li
                style={{
                  opacity: `${
                    params.title === "working"
                      ? params.subtitle === "allWorking"
                        ? 1
                        : 0.5
                      : 0.5
                  }`,
                }}
                onClick={() => navigate("/working/allWorking")}
              >
                Todos Funcionários
              </li>
              <li
                style={{
                  opacity: `${params.subtitle === "prof&tec" ? 1 : 0.5}`,
                }}
                onClick={() => navigate("/working/prof&tec")}
              >
                Professores e Técnicos
              </li>
              <li
                style={{
                  opacity: `${params.subtitle === "attendants" ? 1 : 0.5}`,
                }}
                onClick={() => navigate("/working/attendants")}
              >
                Atendentes
              </li>
            </div>

            <Li className="clients" onClick={() => navigate("/clients")}>
              <img
                width={"25px"}
                height={"25px"}
                src="https://img.icons8.com/fluency-systems-regular/96/A5A5A5/conference-call.png"
                alt="Ícone de três usuários lateralmente, sem cor de fundo, apenas bordas brancas"
              />
              <p>Clientes</p>
            </Li>
            <Li
              className="departments"
              onClick={() => navigate("/departments")}
            >
              <img
                width={"25px"}
                height={"25px"}
                src="https://img.icons8.com/fluency-systems-regular/96/A5A5A5/tree-structure.png"
                alt="Ícone de uma árvore de estrutura, sem cor de fundo, apenas bordas brancas"
              />
              <p>Departamentos</p>
            </Li>
          </ul>
        </div>

        <div className="divCustomization">
          <h1>Customização</h1>
          <ul>
            <li>
              <button
                id="btnChangeTheme"
                className="menuLeftButton hoveractive"
              >
                <img
                  width={"25px"}
                  height={"25px"}
                  src="https://img.icons8.com/fluency-systems-regular/144/ffffff/sun--v1.png"
                  alt="Ícone de um sol, sem cor de fundo, apenas bordas brancas"
                />
                <p>Modo Claro</p>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="divMoreOptions">
        <ul>
          <Li className="config" onClick={() => navigate("/config")}>
            <img
              width={"25px"}
              height={"25px"}
              src="https://img.icons8.com/fluency-systems-regular/144/A5A5A5/settings.png"
              alt="Ícone de uma engrenagem, sem cor de fundo, apenas bordas brancas"
            />
            <p>Configurações</p>
          </Li>
          <Li className="profile" onClick={() => navigate("/profile")}>
            <img
              width={"25px"}
              height={"25px"}
              src="https://img.icons8.com/fluency-systems-regular/96/A5A5A5/resume-website.png"
              alt="Ícone de uma engrenagem, sem cor de fundo, apenas bordas brancas"
            />
            <p>Perfil</p>
          </Li>
        </ul>
        <button
          id="btnExit"
          className="menuLeftButton"
          onClick={() => logoff()}
        >
          <img
            width={"25px"}
            height={"25px"}
            src="https://img.icons8.com/fluency-systems-regular/96/ffffff/shutdown.png"
            alt="Ícone de uma engrenagem, sem cor de fundo, apenas bordas brancas"
          />
          <p>Sair</p>
        </button>
      </div>
    </section>
  );
}
