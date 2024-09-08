import { CheckIcon, XIcon } from "lucide-react"

export const FeatureComparison = () => {
    return (
        <div className="mt-8 max-w-4xl mx-auto mb-12">
            <h1 className="text-3xl font-bold mb-12 text-zinc-700 text-center">Feature Comparison</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2">Feature</th>
                        <th className="text-center py-2">Free</th>
                        <th className="text-center py-2">Premium</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-2">File Import Limit</td>
                        <td className="text-center py-2">5</td>
                        <td className="text-center py-2">50</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">Question Generation Limit</td>
                        <td className="text-center py-2">100</td>
                        <td className="text-center py-2">5000</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">Support</td>
                        <td className="text-center py-2">Basic</td>
                        <td className="text-center py-2">Priority</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">AI Models</td>
                        <td className="text-center py-2">Mistral, Grok</td>
                        <td className="text-center py-2">ChatGPT-4, Llama-3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}