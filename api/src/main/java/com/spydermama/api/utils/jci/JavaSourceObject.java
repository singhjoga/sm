package com.spydermama.api.utils.jci;

import java.io.IOException;
import java.net.URI;

import javax.tools.SimpleJavaFileObject;

public class JavaSourceObject extends SimpleJavaFileObject {
    private final String source;

    protected JavaSourceObject(String name, String source) {
        super(URI.create("string:///" + name.replaceAll("\\.", "/") +
                Kind.SOURCE.extension), Kind.SOURCE);
        this.source = source;
    }

    @Override
    public CharSequence getCharContent(boolean ignoreEncodingErrors)
                                                 throws IOException {
        return source;
    }
}