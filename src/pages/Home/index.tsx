 
import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

/**
 * function register(name: string){
 *  return {
 *     onChange: () => void,
 *     onBlur: () => void,
 *     onFocus: () => void,
 *  }
 * }
 */

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})


// Uma outra forma de referenciar a tipagem do meu formulário, é usando 
// as próprias tipagens que a biblioteca zod extrai em: "newCycleFormValidationSchema".
// Para isso eu uso o "type" extraindo uma outra referência e seus respectivos campos.

// Usando o typeof eu permito com que meu código TypeScript entenda
// uma variável JavaScript
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCyleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema), 
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
     })

    const { handleSubmit, watch, reset } = newCyleForm

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task;

    /**
     * Prop Drilling -> Quando a gente tem MUITAS propriedades APENAS para comunicação
     * entre componentes.
     * 
     * SOLUÇÃO:
     * Context API  => Permite compartilharmos informações entre VÁRIOS componentes
     * da nossa aplicação.
     */

    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCyleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton  disabled={isSubmitDisabled}  type="submit">
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}