package com.ias.ml.service;

import org.tensorflow.SavedModelBundle;
import org.tensorflow.Session;
import org.tensorflow.Tensor;
import org.tensorflow.ndarray.Shape;
import org.tensorflow.proto.framework.SignatureDef;
import org.tensorflow.types.TString;

import java.nio.charset.StandardCharsets;

public class MLService {
    private final SavedModelBundle model;

    public MLService(SavedModelBundle model) {
        this.model = model;
    }

    public void predict(String input) {
        try (Session session = model.session()) {

//            Signature servingDefaultSignature = model.metaGraphDef().getSignatureDefOrThrow("serving_default");
            SignatureDef servingDefaultSignature = model.metaGraphDef().getSignatureDefOrThrow("serving_default");
            // Get input and output tensor names from the signature
            String inputTensorName = servingDefaultSignature.getInputsMap().entrySet().iterator().next().getValue().getName();
            String outputTensorName = servingDefaultSignature.getOutputsMap().entrySet().iterator().next().getValue().getName();

            Tensor inputTensor = Tensor.of(TString.class, Shape.of(1), input.getBytes(StandardCharsets.UTF_8));
            Tensor result = session.runner()
                    .feed(inputTensorName, inputTensor)
                    .fetch(outputTensorName)
                    .run()
                    .get(0);

            outputTensor.copyTo(outputData);
            // Output the result
            System.out.println("Output: " + java.util.Arrays.deepToString(outputData));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}