package com.technovator.api.common.utils.jci;

import java.io.IOException;
import java.util.Arrays;

import javax.tools.DiagnosticCollector;
import javax.tools.FileObject;
import javax.tools.ForwardingJavaFileManager;
import javax.tools.JavaCompiler;
import javax.tools.JavaFileManager;
import javax.tools.JavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;

import com.thetechnovator.common.java.exceptions.BusinessException;

public class Java {
	private static JavaCompiler compiler;
	static {
		compiler = ToolProvider.getSystemJavaCompiler();
		if (compiler == null) {
			throw new IllegalStateException("Application must be run with JDK, not JRE");
		}
	}
	public static <T> T load(Class<T> clz, String className, String source) throws BusinessException {
		DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
		//URLClassLoader parent = (URLClassLoader) Java.class.getClassLoader();
		//String classpath = SimpleCompiler.getClassPath(parent);
		//List<String> compilationOptions = Arrays.asList("-classpath", classpath, "-g:none");
		JavaClassObject byteObject = new JavaClassObject(className);
		JavaSourceObject sourceObject = new JavaSourceObject(className, source);
		StandardJavaFileManager standardFileManager = compiler.getStandardFileManager(diagnostics, null, null);

		JavaFileManager fileManager = createFileManager(standardFileManager, byteObject);

		JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager, diagnostics, null, null, Arrays.asList(sourceObject));

		if (!task.call()) {
			StringBuilder sb = new StringBuilder();
			diagnostics.getDiagnostics().forEach(e -> sb.append(e.toString() + System.lineSeparator()));
			throw new BusinessException(sb.toString());
		}
		try {
			fileManager.close();
			final ClassLoader inMemoryClassLoader = createClassLoader(byteObject);
			Class<T> test = (Class<T>) inMemoryClassLoader.loadClass(className);
			T obj = test.newInstance();

			return obj;
		} catch (IOException e) {
			throw new BusinessException(e);
		} catch (ClassNotFoundException e) {
			throw new BusinessException(e);
		} catch (InstantiationException e) {
			throw new BusinessException(e);
		} catch (IllegalAccessException e) {
			throw new BusinessException(e);
		}
	}

	private static JavaFileManager createFileManager(StandardJavaFileManager fileManager, JavaClassObject byteObject) {
		return new ForwardingJavaFileManager<StandardJavaFileManager>(fileManager) {
			@Override
			public JavaFileObject getJavaFileForOutput(Location location, String className, JavaFileObject.Kind kind, FileObject sibling) throws IOException {
				return byteObject;
			}
		};
	}

	private static ClassLoader createClassLoader(final JavaClassObject byteObject) {
		return new ClassLoader() {
			@Override
			public Class<?> findClass(String name) throws ClassNotFoundException {
				byte[] bytes = byteObject.getBytes();
				return defineClass(name, bytes, 0, bytes.length);
			}
		};
	}

}
