examples = {
"example-0":
`
(MODULE
    (PUBLIC
        (ID Id
            (ASM
                (ARGS x)
                (VARS a b c)
                (ASGN a x)
                (ASGN b x)
                (ASGN c x)
                (RETURN (a b (CALL Hlp /a/s)))))
            
        (ID Hlp
            (ASM
                (ARGS x)
                (RETURN (result x (CALL x)))))

        (ID q
            (LOG
                (GOAL P a b c)
                xyz)))
    
    (PRIVATE
        (ID r
            (DATA
                tralala)))
    
    (ALIAS a
        (MODULE
            (PUBLIC
                (ID s
                    (DATA
                        tralala (CALL t))))
            
            (PRIVATE
                (ID t
                    (DATA
                        tralalattt))))))
`,
"example-0-input":
`
(CALL Id 2)
`,

"echo":
`
(MODULE
    (PUBLIC
        (ID Echo
            (ASM
                (ARGS a)
                (RETURN a)))))
`,
"echo-input":
`
(CALL Echo "xyz")
`,

"frit-frut":
`
(MODULE
    (PUBLIC
        (ID FritFrut
            (ASM
                (ARGS a)
                (VARS x)
                
                (ASGN x ("Calling" "Frit" a "Frut"))
                
                (RETURN x)))))
`,
"frit-frut-input":
`
(CALL FritFrut "and")
`,

"hi-bye":
`
(MODULE
    (PUBLIC
        (ID HiBye
            (ASM
                (ARGS a)
                
                (JMPNE a "hi" l1)
                (RETURN "greeting")
                
                (LABEL l1)
                (JMPNE a "bye" l2)
                (RETURN "farewell")
                
                (LABEL l2)
                (RETURN "unknown")))))
`,
"hi-bye-input":
`
(CALL HiBye "hi")
`,

"foo-bar":
`
(MODULE
    (PUBLIC
        (ID FooBar
            (ASM
                (ARGS a)
                (VARS result)
                
                (JMPNE a "foo" l1)
                (ASGN result "alpha")
                (JMP end)
                
                (LABEL l1)
                (JMPNE a "bar" l2)
                (ASGN result "beta")
                (JMP end)

                (LABEL l2)
                (ASGN result "unknown")
                
                (LABEL end)
                (RETURN result)))))
`,
"foo-bar-input":
`
(CALL FooBar "foo")
`,
"reverse":
`
(MODULE
    (PUBLIC
        (ID ReverseList
            (ASM
                (ARGS input)
                (VARS len head tail acc)
                
                (ASGN acc ())
                (ASGN len (CALL stdlib/lstlen input))
                (JMPEQ len 0 done)

                (LABEL loop)
                (JMPEQ input NIL done)
                (ASGN head (CALL stdlib/first input))
                (ASGN tail (CALL stdlib/rest input))
                (ASGN acc (CALL stdlib/prepend head acc))
                (ASGN input tail)
                (JMP loop)
                
                (LABEL done)
                (RETURN acc)))))
`,
"reverse-input":
`
(CALL ReverseList (1 2 3 4))
`,

"is-element-of":
`
(MODULE
    (PUBLIC
        (ID IsElementOf
            (ASM
                (ARGS element list)
                (VARS result head tail)
                
                (ASGN result FALSE)
                
                (LABEL loop)
                (JMPEQ list NIL done)
                (ASGN head (CALL stdlib/first list))
                (ASGN list (CALL stdlib/rest list))
                (JMPNE head element loop)
                
                (ASGN result TRUE)
                
                (LABEL done)
                (RETURN result)))))
`,
"is-element-of-input":
`
(CALL IsElementOf 2 (1 2 3 4))
`,

"factorial":
`
(MODULE
    (PUBLIC
        (ID Fact
            (ASM
                (ARGS n)
                
                (LABEL l0)
                (JMPNE n 0 ln)
                (RETURN 1)

                (LABEL ln)
                (RETURN
                    (CALL stdlib/mul
                        n
                        (CALL Fact
                            (CALL stdlib/sub n 1))))))))
                
`,
"factorial-input":
`
(CALL Fact 5)
`,

"fib":
`
(MODULE
    (PUBLIC
        (ID Fib
            (ASM
                (ARGS n)
                
                (LABEL l0)
                (JMPNE n 0 l1)
                (RETURN 0)
                
                (LABEL l1)
                (JMPNE n 1 ln)
                (RETURN 1)

                (LABEL ln)
                (RETURN
                    (CALL stdlib/add
                        (CALL Fib
                            (CALL stdlib/sub n 1))
                        
                        (CALL Fib
                            (CALL stdlib/sub n 2))))))))
`,
"fib-input":
`
(CALL Fib 25)
`,

"trig":
`
(MODULE
    (PUBLIC
        (ID Test1
            (ASM
                (RETURN
                    (TrigonometricTests
                        (CALL Trig/Sin 0)
                        (CALL Trig/Cos 0)
                        (CALL Trig/Tan 0)
                        (CALL Trig/Cot 0))))))
    
    (ALIASED
        (ID Trig
            (MODULE
                (PUBLIC
                    (ID Pi (ASM (RETURN 3.141592654)))
                    (ID Prec (ASM (RETURN 0.0001)))

                    (ID Sin
                        (ASM
                            (ARGS alpha)
                            (VARS term sum n)
                            
                            (ASGN alpha (CALL ReduceAngle alpha))
                            (ASGN term alpha)
                            (ASGN sum alpha)
                            (ASGN n 1)
                            
                            (LABEL loop)
                            (JMPEQ (CALL stdlib/leq (CALL Abs term) (CALL Prec)) TRUE end)
                            (ASGN term
                                (CALL stdlib/div
                                    (CALL stdlib/mul
                                        -1
                                        (CALL stdlib/mul
                                            term
                                            (CALL stdlib/mul alpha alpha)))
                                            
                                    (CALL stdlib/mul
                                        (CALL stdlib/mul 2 n)
                                        (CALL stdlib/add (CALL stdlib/mul 2 n) 1))))
                            
                            (ASGN sum (CALL stdlib/add sum term))
                            (ASGN n (CALL stdlib/add n 1))
                            (JMP loop)
                            
                            (LABEL end)
                            (RETURN sum)))
                            
                    (ID Cos
                        (ASM
                            (ARGS alpha)
                            (VARS term sum n)
                            
                            (ASGN alpha (CALL ReduceAngle alpha))
                            (ASGN term 1)
                            (ASGN sum 1)
                            (ASGN n 1)
                            
                            (LABEL loop)
                            (JMPEQ (CALL stdlib/leq (CALL Abs term) (CALL Prec)) TRUE end)
                            (ASGN term
                                (CALL stdlib/div
                                    (CALL stdlib/mul
                                        -1
                                        (CALL stdlib/mul
                                            term
                                            (CALL stdlib/mul alpha alpha)))
                                            
                                    (CALL stdlib/mul
                                        (CALL stdlib/sub (CALL stdlib/mul 2 n) 1)
                                        (CALL stdlib/mul 2 n))))
                            
                            (ASGN sum (CALL stdlib/add sum term))
                            (ASGN n (CALL stdlib/add n 1))
                            (JMP loop)
                            
                            (LABEL end)
                            (RETURN sum)))
                            
                    (ID Tan
                        (ASM
                            (ARGS alpha)
                            (RETURN (CALL stdlib/div (CALL Sin alpha) (CALL Cos alpha)))))
                            
                    (ID Cot
                        (ASM
                            (ARGS alpha)
                            (RETURN (CALL stdlib/div (CALL Cos alpha) (CALL Sin alpha))))))
                            
                (PRIVATE
                    (ID Abs
                        (ASM
                            (ARGS n)

                            (JMPEQ (CALL stdlib/leq 0 n) TRUE end)
                            (RETURN (CALL stdlib/mul -1 n))
                            
                            (LABEL end)
                            (RETURN n)))
                    
                    (ID ReduceAngle
                        (ASM
                            (ARGS alpha)
                            
                            (LABEL leq)
                            (JMPEQ (CALL stdlib/leq (CALL stdlib/mul -1 (CALL Pi)) alpha) TRUE gt)
                            (ASGN alpha (CALL stdlib/add alpha (CALL Pi)))
                            (JMP leq)
                            
                            (LABEL gt)
                            (JMPEQ (CALL stdlib/leq alpha (CALL Pi)) TRUE end)
                            (ASGN alpha (CALL stdlib/sub alpha (CALL Pi)))
                            (JMP gt)
                            
                            (LABEL end)
                            (RETURN alpha))))))))
`,
"trig-input":
`
(CALL Test1)
`,

"stress-1":
`
(MODULE
    (PUBLIC
        (ID Test1
            (ASM
                (RETURN
                    (Tests
                        (Echo
                            (CALL Tests/Echo "xyz"))
                        
                        (FritFrut
                            (CALL Tests/FritFrut "and"))
                        
                        (HiBye
                            (CALL Tests/HiBye "hi")
                            (CALL Tests/HiBye "bye"))
                        
                        (FooBar
                            (CALL Tests/FooBar "foo")
                            (CALL Tests/FooBar "bar"))
                            
                        (ReverseList
                            (CALL Tests/ReverseList (1 2 3 4)))
                        
                        (IsElementOf
                            (CALL Tests/IsElementOf 2 (1 2 3 4)))
                        
                        (Fact
                            (CALL Tests/Fact 5)))))))
    
    (ALIASED
        (ID Tests
            (MODULE
                (PUBLIC
                    (ID Echo
                        (ASM
                            (ARGS a)
                            (RETURN a)))

                    (ID FritFrut
                        (ASM
                            (ARGS a)
                            (VARS x)
                            
                            (ASGN x ("Calling" "Frit" a "Frut"))
                            
                            (RETURN x)))

                    (ID HiBye
                        (ASM
                            (ARGS a)
                            
                            (JMPNE a "hi" l1)
                            (RETURN "greeting")
                            
                            (LABEL l1)
                            (JMPNE a "bye" l2)
                            (RETURN "farewell")
                            
                            (LABEL l2)
                            (RETURN "unknown")))

                    (ID FooBar
                        (ASM
                            (ARGS a)
                            (VARS result)
                            
                            (JMPNE a "foo" l1)
                            (ASGN result "alpha")
                            (JMP end)
                            
                            (LABEL l1)
                            (JMPNE a "bar" l2)
                            (ASGN result "beta")
                            (JMP end)

                            (LABEL l2)
                            (ASGN result "unknown")
                            
                            (LABEL end)
                            (RETURN result)))

                    (ID ReverseList
                        (ASM
                            (ARGS input)
                            (VARS len head tail acc)
                            
                            (ASGN acc ())
                            (ASGN len (CALL stdlib/lstlen input))
                            (JMPEQ len 0 done)

                            (LABEL loop)
                            (JMPEQ input NIL done)
                            (ASGN head (CALL stdlib/first input))
                            (ASGN tail (CALL stdlib/rest input))
                            (ASGN acc (CALL stdlib/prepend head acc))
                            (ASGN input tail)
                            (JMP loop)
                            
                            (LABEL done)
                            (RETURN acc)))

                    (ID IsElementOf
                        (ASM
                            (ARGS element list)
                            (VARS result head tail)
                            
                            (ASGN result FALSE)
                            
                            (LABEL loop)
                            (JMPEQ list NIL done)
                            (ASGN head (CALL stdlib/first list))
                            (ASGN list (CALL stdlib/rest list))
                            (JMPNE head element loop)
                            
                            (ASGN result TRUE)
                            
                            (LABEL done)
                            (RETURN result)))

                    (ID Fact
                        (ASM
                            (ARGS n)
                            
                            (LABEL l0)
                            (JMPNE n 0 ln)
                            (RETURN 1)

                            (LABEL ln)
                            (RETURN
                                (CALL stdlib/mul
                                    n
                                    (CALL Fact
                                        (CALL stdlib/sub n 1)))))))))))
`,
"stress-1-input":
`
(CALL Test1)
`,

"gcd":
`
(MODULE
    (PUBLIC
        (ID Cut
            (ASM
                (ARGS a b)
                (VARS divisor)
                
                (ASGN divisor (CALL Euclidean/Gcd a b))
                
                (RETURN
                    (Fraction
                        (CALL stdlib/div a divisor)
                        (CALL stdlib/div b divisor))))))
    
    (ALIASED
        (ID Euclidean
            (MODULE
                (PUBLIC
                    (ID Gcd
                        (ASM
                            (ARGS a b)
                            (VARS t)
                            
                            (LABEL loop)
                            (JMPEQ b 0 end)
                            (ASGN t b)
                            (ASGN b (CALL stdlib/mod a b))
                            (ASGN a t)
                            (JMP loop)
                            
                            (LABEL end)
                            (RETURN a))))))))

`,
"gcd-input":
`
(CALL Cut 12 16)
`
}

