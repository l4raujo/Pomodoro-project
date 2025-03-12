/* eslint-disable react-refresh/only-export-components */
import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

/**
 * function register(name: string){
 *  return {
 *     onChange: () => void,
 *     onBlur: () => void,
 *     onFocus: () => void,
 *  }
 * }
 */

interface Cycle{
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesContextType{
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})


// Uma outra forma de referenciar a tipagem do meu formulário, é usando 
// as próprias tipagens que a biblioteca zod extrai em: "newCycleFormValidationSchema".
// Para isso eu uso o "type" extraindo uma outra referência e seus respectivos campos.

// Usando o typeof eu permito com que meu código TypeScript entenda
// uma variável JavaScript
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCyleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema), 
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
     })

    const { handleSubmit, watch, reset } = newCyleForm

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished(){
        setCycles((state) => state.map(cycle => {
            if(cycle.id == activeCycleId){
                return {...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        })
        )
    }

    function handleCreateNewCycle(data: NewCycleFormData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset();
    }

    function handleInterruptCycle(){
        setCycles((state) => 
            state.map(cycle => {
                if(cycle.id == activeCycleId){
                    return {...cycle, interruptDate: new Date() }
                } else {
                    return cycle
                }
            })
    )
        setActiveCycleId(null)
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
                <CyclesContext.Provider 
                    value={{ 
                          activeCycle, 
                          activeCycleId, 
                          markCurrentCycleAsFinished, 
                          amountSecondsPassed, 
                          setSecondsPassed
                        }}
                    >
                    <FormProvider {...newCyleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
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