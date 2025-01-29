# Workflow Unified Structure (JSON)

## Idea

The idea behind having a unified structure in the form of JSON for the workflows is to be able to create very custom workflows that can easily be made by other than the founding members of OpenForge.

Each workflow will have only 3 steps, but a new workflow can reuse the output from another workflow as an input or output for itself. That allows segmentation and clarity for developpers who aim to build specific processes.

## Structure

### Base:

- Properties:
  - `cron_schedule`: m(2), h(2), d(2), mo(2), d(2)
  - `steps`: a JSON object that contains 3 steps: `input`, `transformation`, `output`

### Steps:

#### Input

The inputs are the first step in any workflow. In summary, they supply the initial data that we apply a transformation to to expect a desired outcome.

- Properties:
  - `input_type`: this represent what is the type of the input
    - `workflow`: another workflow's output
    - `note`: this is internal data from the notes feature of Open Forge
    - `provider`: this is an external provider data object, e.g: Notion
    - `transcription`: this is a recorded transcription from the chrome extension created for recording Google Meet audios
  - `input_data`: this represent what is the data that will be passed to the transformation step

#### Transformation

The transformations are the step that change the input data based on a specific transformation.

- Properties:
  - `transformation_type`: this represent what is the type of the transformation
    - `n8n`: this calls an n8n endpoint to be able to transform the data
    - `llm`: this calls an llm to execute a specific template, can be whatever
  - `transformation_data`: this represent what is the data that is taken from the input

#### Output

The outputs are the last step in the workflow, they are the expected result after a workflow is executed.

- Properties:
  - `output_type`: this represent what is the type of the output
    - `workflow`: this tells the next workflow that data is available to be used by the current node in the chain.
    - `note`: this is internal data from the notes feature of Open Forge
    - `provider`: this is an external provider data object, e.g: Notion
    - `sms`: sends a text message to a number
    - `email`: sends an email to an address
    - `telegram`: sends a text to a telegram account
    - `whatsapp`: sends a text to a telegram account
  - `output_data`: this represent what is the data that will be outputed by the actual workflow

## Ideas

- Having the ability to chain together workflows seems like an awesome feature. The reason behind chaining and not internally combining those manipulations inside a single workflow is to extract as much as possible the operations from 1 process and build from that.
