/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/incremental.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./parse", "nu-stream/stream"], (function(require, exports, __o, stream) {
    "use strict";
    var provide, provideString, finish, parseIncState, parseInc, runIncState, runInc, runManyState,
            runManyStream, runMany, bind = __o["bind"],
        getParserState = __o["getParserState"],
        next = __o["next"],
        optional = __o["optional"],
        parseState = __o["parseState"],
        Parser = __o["Parser"],
        ParserState = __o["ParserState"],
        Position = __o["Position"],
        runState = __o["runState"],
        trampoline = __o["trampoline"],
        streamFrom = stream["from"],
        isEmpty = stream["isEmpty"],
        NIL = stream["NIL"],
        memoStream = stream["memoStream"],
        Request = (function(chunk, k) {
            var self = this;
            (self.chunk = chunk);
            (self.k = k);
        }),
        Session = (function(done, k, chunks) {
            var self = this;
            (self.done = done);
            (self.k = k);
            (self.chunks = chunks);
        });
    (Session.prototype.addChunk = (function(c) {
        var self = this;
        return new(Session)(self.done, self.k, self.chunks.concat(c));
    }));
    (Session.prototype.hasChunk = (function(c) {
        var self = this;
        return (c < self.chunks.length);
    }));
    (Session.prototype.getChunk = (function(c) {
        var self = this;
        return self.chunks[c];
    }));
    var IncrementalState = (function(chunk, state) {
        var self = this;
        (self.chunk = chunk);
        (self.state = state);
    });
    Object.defineProperties(IncrementalState.prototype, ({
        input: ({
            get: (function() {
                var self = this;
                return self.state.input;
            })
        }),
        position: ({
            get: (function() {
                var self = this;
                return self.state.position;
            })
        }),
        userState: ({
            get: (function() {
                var self = this;
                return self.state.userState;
            })
        })
    }));
    (IncrementalState.prototype.eq = (function(other) {
        var self = this;
        return ((other && (other.chunk === self.chunk)) && self.state.eq(other.state));
    }));
    (IncrementalState.prototype.isEmpty = (function() {
        var self = this;
        return self.state.isEmpty();
    }));
    (IncrementalState.prototype.first = (function() {
        var self = this;
        return self.state.first();
    }));
    (IncrementalState.prototype.next = (function(x) {
        var self = this;
        if ((!self._next)) {
            var chunk = self.chunk;
            (self._next = bind(next(self.state.next(x), getParserState), (function(innerState) {
                var state;
                return (innerState.isEmpty() ? new(Parser)((function(_, m, cok) {
                    return new(Request)((chunk + 1), (function(i) {
                        return cok(x, new(IncrementalState)((chunk + 1),
                            innerState.setInput(i)), m);
                    }));
                })) : ((state = new(IncrementalState)(chunk, innerState)), new(Parser)(
                    (function(_, m, cok) {
                        return cok(x, state, m);
                    }))));
            })));
        }
        return self._next;
    }));
    (IncrementalState.prototype.setInput = (function(input) {
        var self = this;
        return new(IncrementalState)(self.chunk, self.state.setInput(input));
    }));
    (IncrementalState.prototype.setPosition = (function(position) {
        var self = this;
        return new(IncrementalState)(self.chunk, self.state.setPosition(position));
    }));
    (IncrementalState.prototype.setUserState = (function(userState) {
        var self = this;
        return new(IncrementalState)(self.chunk, self.state.setUserState(userState));
    }));
    var forceProvide = (function(c, r) {
        if (r.done) return r;
        var r2 = r.addChunk(c),
            result = trampoline(r2.k(c));
        while (((result instanceof Request) && r2.hasChunk(result.chunk))) {
            (result = trampoline(result.k(r2.getChunk(result.chunk))));
        }
        return ((result instanceof Request) ? new(Session)(false, result.k, r2.chunks) : result);
    });
    (provide = (function(c, r) {
        return (isEmpty(c) ? r : forceProvide(c, r));
    }));
    (provideString = (function(input, r) {
        return provide(streamFrom(input), r);
    }));
    var x = forceProvide.bind(null, NIL);
    (finish = (function(z) {
        var r = x(z);
        return r.k();
    }));
    (parseIncState = (function(p, state, ok, err) {
        var pok = (function(x0, s) {
            return new(Session)(true, ok.bind(null, x0, s));
        }),
            perr = (function(x0, s) {
                return new(Session)(true, err.bind(null, x0, s));
            });
        return provide(state.input, new(Session)(false, (function(i) {
            return parseState(p, new(IncrementalState)(0, state.setInput(i)), pok, perr);
        }), []));
    }));
    (parseInc = (function(p, ud, ok, err) {
        return parseIncState(p, new(ParserState)(NIL, Position.initial, ud), ok, err);
    }));
    var ok = (function(x0) {
        return x0;
    }),
        err = (function(x0) {
            throw x0;
        });
    (runIncState = (function(p, state) {
        return parseIncState(p, state, ok, err);
    }));
    (runInc = (function(p, ud) {
        return runIncState(p, new(ParserState)(NIL, Position.initial, ud));
    }));
    (runManyState = (function(p, state) {
        var manyP = optional(NIL, bind(p, (function(x0) {
            return new(Parser)((function(state0, m, _, _0, eok, _1) {
                return eok(memoStream(x0, runState.bind(null, manyP, state0, m)),
                    state0, m);
            }));
        })));
        return runState(manyP, state);
    }));
    (runManyStream = (function(p, s, ud) {
        return runManyState(p, new(ParserState)(s, Position.initial, ud));
    }));
    (runMany = (function(p, input, ud) {
        return runManyStream(p, streamFrom(input), ud);
    }));
    (exports["provide"] = provide);
    (exports["provideString"] = provideString);
    (exports["finish"] = finish);
    (exports["parseIncState"] = parseIncState);
    (exports["parseInc"] = parseInc);
    (exports["runIncState"] = runIncState);
    (exports["runInc"] = runInc);
    (exports["runManyState"] = runManyState);
    (exports["runManyStream"] = runManyStream);
    (exports["runMany"] = runMany);
}));