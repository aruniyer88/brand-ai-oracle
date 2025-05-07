
import { BrandEntity, Persona, Product, Question, Topic } from "@/types/brandTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

interface ReviewStepProps {
  brandInfo: BrandEntity;
  products: Product[];
  topics: Topic[];
  personas: Persona[];
  questions: Question[];
}

export const ReviewStep = ({
  brandInfo,
  products,
  topics,
  personas,
  questions,
}: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Review Your Setup</h2>
        <p className="text-muted-foreground">
          Review all the information you've provided before submitting.
        </p>
      </div>

      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="brandInfo">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${
                    brandInfo.name && brandInfo.website
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                />
                <span>Brand Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4 rounded-md bg-slate-50">
                <div>
                  <h4 className="font-medium">Brand Name</h4>
                  <p>{brandInfo.name || "Not set"}</p>
                </div>

                <div>
                  <h4 className="font-medium">Website</h4>
                  <p>{brandInfo.website || "Not set"}</p>
                </div>

                {brandInfo.wikiUrl && (
                  <div>
                    <h4 className="font-medium">Wiki URL</h4>
                    <p>{brandInfo.wikiUrl}</p>
                  </div>
                )}

                {brandInfo.aliases.length > 0 && (
                  <div>
                    <h4 className="font-medium">Aliases</h4>
                    <div className="flex flex-wrap gap-2">
                      {brandInfo.aliases.map((alias, index) => (
                        <span
                          key={index}
                          className="bg-white px-2 py-1 rounded-full text-sm border"
                        >
                          {alias}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {brandInfo.socialLinks.length > 0 && (
                  <div>
                    <h4 className="font-medium">Social Links</h4>
                    <ul className="space-y-1">
                      {brandInfo.socialLinks.map((link, index) => (
                        <li key={index}>
                          <span className="font-medium">{link.platform}:</span>{" "}
                          {link.url}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="products">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${
                    products.length > 0 ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span>Products & Offerings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {products.length > 0 ? (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-md p-4 bg-slate-50"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{product.name}</h4>
                        <span className="bg-slate-200 px-2 py-0.5 rounded-full text-xs">
                          {product.category}
                        </span>
                      </div>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium">Value Props:</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.valueProps.map((prop, index) => (
                            <span
                              key={index}
                              className="bg-white px-2 py-0.5 rounded-md text-xs border"
                            >
                              {prop}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-slate-50 rounded-md">
                  <p className="text-muted-foreground">No products added yet.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="topics">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${
                    topics.length > 0 ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span>Topics</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {topics.length > 0 ? (
                <div className="space-y-4">
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="border rounded-md p-4 bg-slate-50"
                    >
                      <h4 className="font-semibold">{topic.name}</h4>
                      {topic.description && <p className="text-sm mt-1">{topic.description}</p>}
                      
                      {topic.products && topic.products.length > 0 && (
                        <div className="mt-2">
                          <h5 className="text-sm font-medium">Related Products:</h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {topic.products.map((productId) => {
                              const product = products.find((p) => p.id === productId);
                              return (
                                product && (
                                  <span
                                    key={productId}
                                    className="bg-white px-2 py-0.5 rounded-md text-xs border"
                                  >
                                    {product.name}
                                  </span>
                                )
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-slate-50 rounded-md">
                  <p className="text-muted-foreground">No topics added yet.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="personas">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${
                    personas.length > 0 ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span>Personas</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {personas.length > 0 ? (
                <div className="space-y-4">
                  {personas.map((persona) => (
                    <div
                      key={persona.id}
                      className="border rounded-md p-4 bg-slate-50"
                    >
                      <h4 className="font-semibold">{persona.name}</h4>
                      <p className="text-sm">{persona.description}</p>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium">Pain Points:</h5>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            {persona.painPoints.map((point, idx) => (
                              <li key={idx} className="text-xs">{point}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium">Motivators:</h5>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            {persona.motivators.map((item, idx) => (
                              <li key={idx} className="text-xs">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {(persona.topicId || persona.productId) && (
                        <div className="mt-2 text-xs">
                          <h5 className="font-medium">Related To:</h5>
                          {persona.topicId && (
                            <p>
                              Topic: {topics.find(t => t.id === persona.topicId)?.name}
                            </p>
                          )}
                          {persona.productId && (
                            <p>
                              Product: {products.find(p => p.id === persona.productId)?.name}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-slate-50 rounded-md">
                  <p className="text-muted-foreground">No personas added yet.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="questions">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${
                    questions.length > 0 ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span>Questions</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {questions.length > 0 ? (
                <div className="space-y-2">
                  {questions.map((question) => (
                    <div
                      key={question.id}
                      className="border rounded-md p-3 bg-slate-50"
                    >
                      <p className="font-medium">{question.text}</p>
                      {question.personaId && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Asked by: {personas.find(p => p.id === question.personaId)?.name || "Unknown persona"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-slate-50 rounded-md">
                  <p className="text-muted-foreground">No questions added yet.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex justify-center pt-6">
        <Button asChild className="px-8">
          <Link to="/sandbox">
            Test Your Setup in Sandbox <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
