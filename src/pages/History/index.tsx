import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History(){
    const { cycles } = useContext(CyclesContext)
    return(
        <HistoryContainer>
            <pre>{JSON.stringify(cycles, null, 2)}</pre>

            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>Duração</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="red">
                                    Interrompido
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>Duração</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="green">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>Duração</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="yellow">
                                    Em andamento
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>Duração</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="yellow">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>Duração</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="yellow">
                                    Concluído
                                </Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer> 
    )
}