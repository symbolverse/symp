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
                
                (LABEL f0)
                (JMPNE n 0 fn)
                (RETURN 1)

                (LABEL fn)
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
                
                (LABEL f0)
                (JMPNE n 0 f1)
                (RETURN 0)
                
                (LABEL f1)
                (JMPNE n 1 fn)
                (RETURN 1)

                (LABEL fn)
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

"bool":
`
/*
    Boolean Calculator
    
    supported operations on numbers: \`lt\`, \`leq\`, \`eq\`, \`geq\`, \`gt\`
    supported operations on booleans: \`and\`, \`or\`, \`not\`
*/

(GRAPH
    (COMPUTE
        (NAME bool)
        (GRAPH
            (EDGE
                (SOURCE BEGIN)
                (INSTR
                    (ASGN fun (RUN stdlib ("first" PARAMS)))
                    (ASGN arg (RUN stdlib ("rest" PARAMS))))
                    
                (TARGET calc))

            /*
                dispatcher
            */
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "and"))
                    
                (TARGET calcAnd))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "or"))
                    
                (TARGET calcOr))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "not"))
                    
                (TARGET calcNot))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "lt"))
                    
                (TARGET calcLt))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "leq"))
                    
                (TARGET calcLeq))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "eq"))
                    
                (TARGET calcEq))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "geq"))
                    
                (TARGET calcGeq))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "gt"))
                    
                (TARGET calcGt))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (ASGN RESULT "ERROR: Unsupported operation"))
                    
                (TARGET END))
            
            /*
                and
            */
            
            (EDGE
                (SOURCE calcAnd)
                (INSTR
                    (ASGN res "true"))
                    
                (TARGET andLoop))

            (EDGE
                (SOURCE andLoop)
                (INSTR
                    (TEST arg ())
                    (ASGN RESULT res))
                    
                (TARGET END))

            (EDGE
                (SOURCE andLoop)
                (INSTR
                    (TEST (RUN stdlib ("first" arg)) "true")
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET andLoop))

            (EDGE
                (SOURCE andLoop)
                (INSTR
                    (TEST (RUN stdlib ("first" arg)) "false")
                    (ASGN RESULT "false"))
                    
                (TARGET END))

            (EDGE
                (SOURCE andLoop)
                (INSTR
                    (ASGN
                        arg
                        (RUN
                            stdlib
                            ("prepend"
                                (RUN bool (RUN stdlib ("first" arg)))
                                (RUN stdlib ("rest" arg))))))
                                
                (TARGET andLoop))

            /*
                or
            */
            
            (EDGE
                (SOURCE calcOr)
                (INSTR
                    (ASGN res "false"))
                    
                (TARGET orLoop))

            (EDGE
                (SOURCE orLoop)
                (INSTR
                    (TEST arg ())
                    (ASGN RESULT res))
                    
                (TARGET END))
            
            (EDGE
                (SOURCE orLoop)
                (INSTR
                    (TEST (RUN stdlib ("first" arg)) "false")
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET orLoop))

            (EDGE
                (SOURCE orLoop)
                (INSTR
                    (TEST (RUN stdlib ("first" arg)) "true")
                    (ASGN RESULT "true"))
                    
                (TARGET END))

            (EDGE
                (SOURCE orLoop)
                (INSTR
                    (ASGN
                        arg
                        (RUN
                            stdlib
                            ("prepend"
                                (RUN bool (RUN stdlib ("first" arg)))
                                (RUN stdlib ("rest" arg))))))
                                
                (TARGET orLoop))

            /*
                not
            */
            
            (EDGE
                (SOURCE calcNot)
                (INSTR
                    (TEST arg ("false"))
                    (ASGN RESULT "true"))
                    
                (TARGET END))

            (EDGE
                (SOURCE calcNot)
                (INSTR
                    (TEST arg ("true"))
                    (ASGN RESULT "false"))
                    
                (TARGET END))

            (EDGE
                (SOURCE calcNot)
                (INSTR
                    (ASGN arg ((RUN bool (RUN stdlib ("first" arg))))))
                    
                (TARGET calcNot))
            
            /*
                leq
            */
                
            (EDGE
                (SOURCE calcLeq)
                (INSTR
                    (ASGN
                        RESULT
                        (RUN
                            stdlib
                            ("leq"
                                (RUN stdlib ("nth" 0 arg))
                                (RUN stdlib ("nth" 1 arg))))))
                (TARGET END))

            /*
                gt
            */
                
            (EDGE
                (SOURCE calcGt)
                (INSTR
                    (ASGN
                        RESULT
                        (RUN
                            bool
                            ("not"
                                ("leq"
                                    (RUN stdlib ("nth" 0 arg))
                                    (RUN stdlib ("nth" 1 arg)))))))
                                    
                (TARGET END))


            /*
                lt
            */
                
            (EDGE
                (SOURCE calcLt)
                (INSTR
                    (ASGN
                        RESULT
                        (RUN
                            bool
                            ("not"
                                ("leq"
                                    (RUN stdlib ("nth" 1 arg))
                                    (RUN stdlib ("nth" 0 arg)))))))
                                    
                (TARGET END))

            /*
                geq
            */
                
            (EDGE
                (SOURCE calcGeq)
                (INSTR
                    (ASGN
                        RESULT
                        (RUN
                            bool
                            ("leq"
                                (RUN stdlib ("nth" 1 arg))
                                (RUN stdlib ("nth" 0 arg))))))
                                
                (TARGET END))

            /*
                eq
            */
                
            (EDGE
                (SOURCE calcEq)
                (INSTR
                    (ASGN
                        RESULT
                        (RUN
                            bool
                            ("and"
                                ("leq"
                                    (RUN stdlib ("nth" 0 arg))
                                    (RUN stdlib ("nth" 1 arg)))
                                    
                                ("leq"
                                    (RUN stdlib ("nth" 1 arg))
                                    (RUN stdlib ("nth" 0 arg)))))))
                                    
                (TARGET END))))

    // Top-level call
    (EDGE
        (SOURCE BEGIN)
        (INSTR (ASGN RESULT (RUN bool PARAMS)))
        (TARGET END)))
`,
"bool-input":
`
(and
    (or
        false
        (gt 10 5)
        (not true))
        
    (eq 5 5))
`,

"num":
`
/*
    Numeric Calculator
    
    supported operations: \`add\`, \`sub\`, \`mul\`, \`div\`, \`pow\`
*/

(GRAPH
    (COMPUTE
        (NAME num)
        (GRAPH
            (EDGE
                (SOURCE BEGIN)
                (INSTR
                    (ASGN fun (RUN stdlib ("first" PARAMS)))
                    (ASGN arg (RUN stdlib ("rest" PARAMS))))
                    
                (TARGET calc))

            /*
                dispatcher
            */
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "add"))
                    
                (TARGET calcAdd))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "sub"))
                    
                (TARGET calcSub))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "mul"))
                    
                (TARGET calcMul))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "div"))
                    
                (TARGET calcDiv))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (TEST fun "pow"))
                    
                (TARGET calcPow))
            
            (EDGE
                (SOURCE calc)
                (INSTR
                    (ASGN RESULT "ERROR: Unsupported operation"))
                    
                (TARGET END))
            
            /*
                "add"
            */
            
            (EDGE
                (SOURCE calcAdd)
                (INSTR
                    (ASGN res "0"))
                    
                (TARGET addLoop))

            (EDGE
                (SOURCE addLoop)
                (INSTR
                    (TEST arg ())
                    (ASGN RESULT res))
                    
                (TARGET END))

            (EDGE
                (SOURCE addLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (TEST (RUN stdlib ("isatom" tmp)) "true")
                    (ASGN res (RUN stdlib ("add" res tmp)))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET addLoop))

            (EDGE
                (SOURCE addLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (ASGN res (RUN stdlib ("add" res (RUN num tmp))))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET addLoop))
            
            /*
                "sub"
            */
            
            (EDGE
                (SOURCE calcSub)
                (INSTR
                    (ASGN res (RUN stdlib ("first" arg)))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET subLoop))

            (EDGE
                (SOURCE subLoop)
                (INSTR
                    (TEST arg ())
                    (ASGN RESULT res))
                    
                (TARGET END))

            (EDGE
                (SOURCE subLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (TEST (RUN stdlib ("isatom" tmp)) "true")
                    (ASGN res (RUN stdlib ("sub" res tmp)))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET subLoop))

            (EDGE
                (SOURCE subLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (ASGN res (RUN stdlib ("sub" res (RUN num tmp))))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET subLoop))
            
            /*
                "mul"
            */
            
            (EDGE
                (SOURCE calcMul)
                (INSTR
                    (ASGN res "1"))
                    
                (TARGET mulLoop))

            (EDGE
                (SOURCE mulLoop)
                (INSTR
                    (TEST arg ())
                    (ASGN RESULT res))
                    
                (TARGET END))

            (EDGE
                (SOURCE mulLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (TEST (RUN stdlib ("isatom" tmp)) "true")
                    (ASGN res (RUN stdlib ("mul" res tmp)))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET mulLoop))

            (EDGE
                (SOURCE mulLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (ASGN res (RUN stdlib ("mul" res (RUN num tmp))))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET mulLoop))
            
            /*
                "div"
            */
            
            (EDGE
                (SOURCE calcDiv)
                (INSTR
                    (ASGN res (RUN stdlib ("first" arg)))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET divLoop))

            (EDGE
                (SOURCE divLoop)
                (INSTR
                    (TEST arg ())
                    (ASGN RESULT res))
                    
                (TARGET END))

            (EDGE
                (SOURCE divLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (TEST (RUN stdlib ("isatom" tmp)) "true")
                    (ASGN res (RUN stdlib ("div" res tmp)))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET divLoop))

            (EDGE
                (SOURCE divLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (ASGN res (RUN stdlib ("div" res (RUN num tmp))))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET divLoop))

            /*
                "pow"
            */
            
            (EDGE
                (SOURCE calcPow)
                (INSTR
                    (ASGN res (RUN stdlib ("first" arg)))
                    (ASGN arg (RUN stdlib ("rest" arg)))
                    (TEST (RUN stdlib ("isatom" res)) "true"))
                    
                (TARGET powLoop))

            (EDGE
                (SOURCE calcPow)
                (INSTR
                    (ASGN res (RUN num res)))
                    
                (TARGET powLoop))

            (EDGE
                (SOURCE powLoop)
                (INSTR
                    (TEST arg ())
                    (ASGN RESULT res))
                    
                (TARGET END))

            (EDGE
                (SOURCE powLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (TEST (RUN stdlib ("isatom" tmp)) "true")
                    (ASGN res (RUN stdlib ("pow" res tmp)))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET powLoop))

            (EDGE
                (SOURCE powLoop)
                (INSTR
                    (ASGN tmp (RUN stdlib ("first" arg)))
                    (ASGN res (RUN stdlib ("pow" res (RUN num tmp))))
                    (ASGN arg (RUN stdlib ("rest" arg))))
                    
                (TARGET powLoop))))

    // Top-level call
    (EDGE
        (SOURCE BEGIN)
        (INSTR (ASGN RESULT (RUN num PARAMS)))
        (TARGET END)))
`,
"num-input":
`
(pow
    (add
        2
        (mul
            3
            (div
                8
                4))

        (sub
            4
            -3))

    2)
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
    
    (ALIAS Tests
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
                        
                        (LABEL f0)
                        (JMPNE n 0 fn)
                        (RETURN 1)

                        (LABEL fn)
                        (RETURN
                            (CALL stdlib/mul
                                n
                                (CALL Fact
                                    (CALL stdlib/sub n 1))))))))))
`,
"stress-1-input":
`
(CALL Test1)
`
}

